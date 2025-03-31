import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryService } from '../../../../core/services/category.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent {
  displayedColumns = ['No', 'Category', 'Description', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private dialog: MatDialog, private $categoryService: CategoryService) {
  }

  ngOnInit() {
    this.$categoryService.getCategory().subscribe(result => {
      this.dataSource.data = result;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ADD') {
        this.$categoryService.getCategory().subscribe(result => {
          this.dataSource.data = result;
        })
      }
    });
  }

  onEditCategory(category: any) {
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      data: category,
      hasBackdrop: true,
      disableClose: true,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'EDIT') {
        this.$categoryService.getCategory().subscribe(result => {
          this.dataSource.data = result;
        })
      }
    });
  }
}
