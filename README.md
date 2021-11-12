# DataFilterChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Details about solution

My approach was to have a products data table that receives data via an observable that combines the information from the API (the json file in this case) with the applied filters.
Then having a service to perform simple CRUD operations over the filters and then emit each change to the behavior subject which in turn emits to the observable the data is listening to. Note that I decided to limit the columns that get shown from the data because there too many. My reason was simply to make the table look a bit nicer and not have to implement any vertical scrolling or styling adjustments, but this column filtering can be removed and it would not affect the functionality

### Libraries
I decided to add Angular Material for the usage of the Dialog and Datatable basically. I added other modules from material to make the app look a bit nicer but my motivation was mainly the usage of the datatable and dialog. Also, I haven't worked with Angular for a while so I decided to use something that I've used in the past to have a certain feeling of familiarity :)

### Improvements: 
- The form to CREATE/UPDATE filters doesn't have any validation, so this could be an improvement, albeit a trivial one because there are not many fields.

- Restricting the filter's value input depending on the type of property being read, that is numbers with numbers and strings with strings. Related to this, the filter service is already making a simple validation where filter values are being matched and applied based on the the data type of the property of the Product.

- Making the filters service more generic. This should be relatively simple, by making use of a generic type T to pass in to the DynamicFilter interface, which was created with thie generic type paremeter in mind for such improvement.

- Implementing the pagination of the datatable, whether client or server side. Client side we would page locally by listening to the paginator events, and ideally data would also live in a state layer, so these events would dispatch to the store which would eventually trigger an observable to change with the fresh data. With server side a similar approach would ensue but we would be making http requests instead.

- Overall styling can be improved, hiding the filters under a navigation drawer or a modal, making sure overwflows are handled nicely, improving the look of the table, etc.


