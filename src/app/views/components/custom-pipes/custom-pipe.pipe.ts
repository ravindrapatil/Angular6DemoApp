import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

// Display default image
@Pipe({
  name: 'defaultimage'
})
export class DefaultImagePipe implements PipeTransform {

  // transform(value: string, fallback: string, forceHttps: boolean = false): string {
    transform(value: string, fallback: string): string {  
    let image = "";
    if(value) {
      image = value
    } else {
      image = fallback
    }
    // if(forceHttps) {
    //   if(image.indexOf('https') == -1) {
    //     image = image.replace('http', 'https');
    //   }
    // }
    return image;
  }

}

// First letter uppercase
@Pipe({
  name: 'firstcharcateruppercase'
})
export class FirstcharcateruppercasePipe implements PipeTransform {
  transform(value: string, args: string[]): any { 
    if(!value) {
      return value;
    }
    return value.replace(/\w\S*/g, (str) => {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  }   
}

// Truncate string
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10, trail: string = '...'): string {
    if(value == null) {
      return "";
    }
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

//Adding some multiplication to the value
@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, multiplyBy: number = 5): any {
    if(value == null) {
      return "";
    }
    return value * multiplyBy;
  }
}

// Filter Pipe
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string ): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      let companyNameStr = it.companyName;
      let primaryExchange = it.primaryExchange;
      let sectorStr = it.sector;
      let symbolStr = it.symbol;
      let marketCap = it.marketCap;
      let marketCapStr = marketCap.toString();
      return companyNameStr.toLowerCase().includes(searchText) 
        || primaryExchange.toLowerCase().includes(searchText) 
        || sectorStr.toLowerCase().includes(searchText) 
        || symbolStr.toLowerCase().includes(searchText) 
        || marketCapStr.includes(searchText);
    });
  }
}