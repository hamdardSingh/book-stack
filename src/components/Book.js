import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const Book = (props) => {
  const {book, moveShelf} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setFavourite = (e, id) => {
    let myFavourites = localStorage.getItem('myFavourites');
    let favID = [id];
    if(myFavourites){
      myFavourites = JSON.parse(myFavourites);
      myFavourites = myFavourites.filter((bookId)=> {
        if(bookId === id)
          favID = [];
        else
          return bookId;
      });
      localStorage.setItem('myFavourites', JSON.stringify([...myFavourites, ...favID]));
    }else{
      localStorage.setItem('myFavourites', JSON.stringify(favID));
    }
    let elem = (e.currentTarget).querySelector('svg');
    elem.classList.toggle('active');
  }

  const isFavourite = (id) => {
    const myFavourites = localStorage.getItem('myFavourites');
    return (myFavourites && myFavourites.includes(id)) ? true : false;
  }

  return (
    <Card className='h-100'>
      <CardActionArea>
        <CardMedia alt={book.title} title={book.title} className="card-image">
          <img src={book.imageLinks.thumbnail} alt={book.title} title={book.title} className="w-100" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" className="h6 nowrap" component="h6" title={book.title}>{book.title}</Typography>
          <Typography variant="body2" className="nowrap" color="textSecondary" component="p" title={ (book.authors).join(', ') }>{ (book.authors).join(', ') }</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton onClick={(e)=>{setFavourite(e, book.id)}} aria-label="add to favorites"><FavoriteIcon className={ (isFavourite(book.id)) ? 'active' : ''} /></IconButton>
        <IconButton aria-controls={book.id} aria-haspopup="true" onClick={handleClick}><MoreVertIcon /></IconButton>
        <Menu id={book.id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={()=>{moveShelf(book,'currentlyReading'); handleClose()}}>Currently Reading</MenuItem>
          <MenuItem onClick={()=>{moveShelf(book,'wantToRead'); handleClose()}}>Want to Read</MenuItem>
          <MenuItem onClick={()=>{moveShelf(book,'read'); handleClose()}}>Read</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

export default Book;
