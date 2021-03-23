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
import * as BookAPI from '../BookAPI';

class Search extends Component {
  state = {
    books: this.props.books,
    shelfs: this.props.shelfs,
    query: '',
    filteredBooks: []
  }

  search = (query) => {
    if(query.trim() !== ""){
      this.setState({query});
      BookAPI.search(query).then((books)=>{
        if(books && books.length)
          this.setState({filteredBooks: books})
        else
          this.setState({filteredBooks: []})
      });
    }
    else{
      this.setState({filteredBooks: []})
    }

  }

  static getDerivedStateFromProps(props){
    return props;
  }

  moveShelf =this.props.moveShelf;
  render(){

    const {books,query,filteredBooks} = this.state;

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
              <Input placeholder="Search" autoFocus={true} style={{display:'block',color:'#fff'}} onChange={(event) => this.search(event.target.value)} />
            </form>
          </Toolbar>
        </AppBar>
        <Container style={{paddingTop:'2rem'}}>
          <Grid container spacing={2} className="grid">
          {
            filteredBooks.map((book)=>{
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
    );
  }
}

export default Search;
