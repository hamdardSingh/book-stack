import React,{Component}  from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Route } from 'react-router-dom';
import Search from './Search';
import Book from './Book';
import {Header} from './Header';
import * as BookAPI from '../BookAPI';

class Index extends Component {
  state = {
    books: [],
    backdrop: true,
    shelfs:{
      currentlyReading: [],
      read: [],
      wantToRead: []
    }
  }
  moveShelf = (book,shelf) => {
    this.setState({backdrop:true});
    BookAPI.update(book,shelf).then((books)=>{
      //We can update it locally or refetch the state with getAll API
      this.setState((currentState)=>{
        (currentState.books).map((currentBook) => {
          if(currentBook.id === book.id){
            currentBook.shelf = shelf;
          }
          return currentBook;
        })
        currentState.backdrop = false;
        currentState.shelfs = books;
        return currentState;
      })
    });
  }

  getMyBooks = () => {
    BookAPI.getAll().then((books)=>{
      let shelfs = this.state.shelfs;
      books.forEach((book) => {
        if(!shelfs[book.shelf].includes(book.id)){
          shelfs[book.shelf].push(book.id)
        }
      })
      this.setState({books,backdrop:false,shelfs: shelfs})
    })
  }
  componentDidMount(){
    this.getMyBooks();
  }
  render() {
    const currentlyReading = this.state.books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = this.state.books.filter((book) => book.shelf === "wantToRead");
    const read = this.state.books.filter((book) => book.shelf === "read");
    return (
        <div>
        <Route exact path="/" render={() => (
          <div>
            <Header />
            <Container style={{paddingTop:'2rem'}}>
              <Typography variant="h5" className='h5'>Currently Reading</Typography>
              <Grid container spacing={2} className="grid">
              {
                currentlyReading.map((book)=>{
                  return (
                    <Grid key={book.id} item xs={6} md={3} lg={2}>
                      <Book book={book} shelfs={this.state.shelfs} moveShelf={this.moveShelf} />
                    </Grid>
                  )
                })
              }
              </Grid>
              <Typography variant="h5" className='h5'>Want to Read </Typography>
              <Grid container spacing={2} className="grid">
              {
                wantToRead.map((book)=>{
                  return (
                    <Grid key={book.id} item xs={6} md={3} lg={2}>
                      <Book book={book} shelfs={this.state.shelfs} moveShelf={this.moveShelf} />
                    </Grid>
                  )
                })
              }
              </Grid>
              <Typography variant="h5" className='h5'>Read</Typography>
              <Grid container spacing={2} className="grid">
              {
                read.map((book)=>{
                  return (
                    <Grid key={book.id} item xs={6} md={3} lg={2}>
                      <Book book={book} shelfs={this.state.shelfs} moveShelf={this.moveShelf} />
                    </Grid>
                  )
                })
              }
              </Grid>
            </Container>
          </div>
        )} />

        <Route exact path="/search" render={() => (
          <Search books={this.state.books} shelfs={this.state.shelfs} moveShelf={this.moveShelf} />
        )} />
        <Backdrop open={this.state.backdrop} className="backdrop">
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      )
  }
}

export default Index;
