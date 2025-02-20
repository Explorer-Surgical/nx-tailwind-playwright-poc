import {
  forecastActions,
  selectForecastCurrentCity,
  selectForecastData,
  selectForecastError,
  selectForecastStatus,
  SortType,
} from '@angular-enterprise-stack/ghx-marketplace/data-access';
import { DatePipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ff-feat-list',
  standalone: true,
  imports: [DatePipe, NgForOf, NgStyle, NgIf],
  templateUrl: './list-smart.component.html',
  styleUrls: ['./list-smart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSmartComponent {
  private readonly store = inject(Store);

  public readonly selectedCity = toSignal(
    this.store.select(selectForecastCurrentCity),
  );

  public readonly forecastStatus = toSignal(
    this.store.select(selectForecastStatus),
  );

  public readonly forecastError = toSignal(
    this.store.select(selectForecastError),
  );
  public readonly forecastData = toSignal(
    this.store.select(selectForecastData),
    { initialValue: [] },
  );

  sortList(value: SortType) {
    this.store.dispatch(forecastActions.sortForecastData({ sortType: value }));
  }
}
