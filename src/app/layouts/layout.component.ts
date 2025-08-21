import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LAYOUT } from './layout.model';
import { EventService } from '../core/services/event.service';
import { FormGroup } from '@angular/forms';
import { Apiservice } from '../core/services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  // layout related config
  layoutType!: string;
  showMain: any;
  modalForm!: FormGroup;
  companyDropdown: any[] = [];
  isShown =  false;

  constructor(private eventService: EventService, private apiservice: Apiservice) { }
  
  ngAfterViewInit(): void {
    const data = document.getElementById("myModal");
    if (data != null) {
      data.style.display = 'block';
      data.style.background = 'rgba(0, 0, 0, 0.40)';
    }
  }

  ngOnInit() {
    this.layoutType = LAYOUT;

    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

  }

  getText(item: any): string {
    return item.name ? item.name : ''
  }
  /**
  * Check if the vertical layout is requested
  */
  isVerticalLayoutRequested() {
    return this.layoutType === 'vertical';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === 'horizontal';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isTwoColumnLayoutRequested() {
    return this.layoutType === 'twocolumn';
  }

}
