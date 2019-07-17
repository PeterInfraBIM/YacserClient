import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
// @ts-ignore
import introspectionQueryResultData from 'fragmentTypes.json';
import {ModelListComponent} from './model-list/model-list.component';
import {ObjectListComponent} from './object-list/object-list.component';
import {ObjectDetailsComponent} from './object-list/object-details/object-details.component';
import {LiteralEditorComponent} from './object-list/object-details/editors/literal-editor/literal-editor.component';
import {LinkEditorComponent} from './object-list/object-details/editors/link-editor/link-editor.component';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    ObjectListComponent,
    ObjectDetailsComponent,
    LiteralEditorComponent,
    LinkEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  entryComponents: [
    ObjectDetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({
        uri: 'http://localhost:8080/graphql'
      }),
      cache: new InMemoryCache({fragmentMatcher})
    });
  }
}
