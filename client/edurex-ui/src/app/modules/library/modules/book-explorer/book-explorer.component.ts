import { Component, OnInit } from '@angular/core';
import { LibraryCategoryService } from '../../service/library-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../service/book.service';
import {config} from 'src/conf';
import { FormControl } from '@angular/forms';
import { filter } from 'minimatch';

@Component({
  selector: 'app-book-explorer',
  templateUrl: './book-explorer.component.html',
  styleUrls: ['./book-explorer.component.css']
})
export class BookExplorerComponent implements OnInit {

  categories=[];
  copyCategories=[];
  books = [];
  imgUrl = config.host + "thumbnail/";
  navFilter = new FormControl('');
  constructor(private libCategoryService : LibraryCategoryService,private bookService : BookService,
    private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.getLatestBooks();
  }

  getCategories()
  {
  this.libCategoryService.getArticleCategories().subscribe(
    data => {
      this.categories = data as Array<any>;
      this.copyCategories = data as Array<any>;
    },
    err => {
      this._snackbar.open("Error in loading Article Category",null,{duration : 5000})
    }
  )
  }

  getLatestBooks()
  {
    this.bookService.getLatestBooks().subscribe(
      data=>{
        
        this.books = data as Array<any>;
      },
      err=>{
        this._snackbar.open("Error in loading Latest release books",null,{duration : 5000})
      }
    )
  }

  isSubCat(cat : Array<any>,filter : string)
  {
    cat.forEach(
      (value) =>{
        if(value.toLowerCase().includes(filter.toLocaleLowerCase()))
        {
          return true;
        }

       }
    );

    return false;

  }

  filterNavigate(event : Event)
  {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.categories = filterValue != '' ? this.copyCategories.filter(value =>
      value.book_category.toLowerCase().includes(filterValue.toLowerCase()) 
    ) : this.copyCategories;
  }

}
