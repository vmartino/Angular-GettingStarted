import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    @Output() starWidth: number;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();
    ngOnChanges(): void {
        // The width of the crop styled div in the template is 75
        // The crop css style hides what is not fitting the style.width.px
        // 5 stars will size the div to 75px (no crop) while 0 stars will amount to 0px width (full crop)
        this.starWidth = (this.rating / 5) * 75; 
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}