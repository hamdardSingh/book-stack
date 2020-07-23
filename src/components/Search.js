import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Book from './Book';

class Search extends Component {
  state = {
    books: this.props.books,
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query});
  }

  static getDerivedStateFromProps(props){
    return props;
  }

  moveShelf =this.props.moveShelf;
  render(){
    const {books,query} = this.state;
    const filteredBooks = query === '' ? [] : books.filter((book)=>book.title.toLowerCase().includes(query.toLowerCase()))
    return(
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link to="/" className="icon-link">
              <IconButton edge="start" color="inherit" aria-label="back">
                <ArrowBackIcon />
              </IconButton>
            </Link>
            <form  noValidate autoComplete="off" style={{flexGrow:1}}>
              <Input placeholder="Search" autoFocus={true} style={{display:'block',color:'#fff'}} onChange={(event) => this.updateQuery(event.target.value)} />
            </form>
          </Toolbar>
        </AppBar>
        <Container style={{paddingTop:'2rem'}}>
          {filteredBooks.length !== books.length && (<Typography className='text-center mb-2' variant="body1" color="textSecondary" component="p">Now Showing {filteredBooks.length} of {books.length} </Typography>)}
          <Grid container spacing={2} className="grid">
          {
            filteredBooks.map((book)=>{
              return (
                <Grid key={book.id} item xs={6} md={3} lg={2}>
                  <Book book={book} moveShelf={this.moveShelf} />
                </Grid>
              )
            })
          }
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Search;
