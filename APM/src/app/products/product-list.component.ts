import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent 
    implements OnInit {
    
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    // We create a separate property to bind filtered products.
    // This prevents us keeping the original list of products unaffected by filtering operations.
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    _listFilter: string;
    public get listFilter() : string {
        return this._listFilter;
    }
    
    public set listFilter(v : string) {
        this._listFilter = v;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    constructor(private productService: ProductService) {
        // this.listFilter = 'cart';
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    // We use onInit to initialize the component with data
    ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    onRatingClicked(event: string): void {
        this.pageTitle = 'Product List: ' + event;       
    }
}