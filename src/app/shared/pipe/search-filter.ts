

import {Injectable, Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: 'searchFilter',
    pure: true
})
@Injectable()
export class SearchFilter implements PipeTransform {
    transform ( items: any[], args: any ): any[ ] {
        console.log(items);
        console.log(args);
        const searchCtrl = ( data: any ) => {
            let all = false;
            if ( typeof data === 'object' ) {
                for ( let z in data ) {
                    if ( all = searchCtrl( data[z] ) ) {
                        break;
                    }

                }
            } else {
                if ( typeof data === 'number' ) {
                    all = data === args;
                } else {
                    all = data.toString().match( new RegExp( args, 'i' ) );
                }
            }
            return all;
        };

        return items.filter(searchCtrl);
    }
}