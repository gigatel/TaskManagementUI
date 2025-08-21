import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myCurrentyFormat' })

export class MyCurrentyFormat implements PipeTransform {
    transform(val: number) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
      }).format(Number(val));
    }
}