import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDrawerComponent, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { AppService, List } from '../shared/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOMER_API_URL } from '../app-injection-customer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

  navigation: List[];

/*   showSubmenuModes: string[] = ['slide', 'expand'];

  positionModes: string[] = ['left', 'right'];

  showModes: string[] = ['push', 'shrink', 'overlap']; */

  text: string;

  selectedOpenMode = 'overlap';

  selectedPosition = 'left';

  selectedRevealMode = 'slide';

  isDrawerOpen = true;

  elementAttr: any;

  constructor(service: AppService,
              @Inject(CUSTOMER_API_URL) private customerUrl: string,
              private router: Router,
              private route: ActivatedRoute) {
    /* this.text = service.getContent(); */
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen,
    },
  }];

  ngOnInit(): void {
    console.log('HeaderComponent is init!');
  }

  onItemClickMenu(e: any) {
    var iData = e.itemData;
    console.log(iData);
    console.log(this.customerUrl+iData.sourceUrl);
    this.router.navigateByUrl(iData.sourceUrl);
  }
}
