import { combineEpics } from 'redux-observable'
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';


import { from, Observable, Subject } from 'rxjs';
import { loadModules } from 'react-arcgis';
import store from '../stores/configureStore';
import { ApiService } from '../services/data.service';
import { graphicsService } from '../components/routes/graphicsSevice';


const pingEpic = action$ =>
  action$.ofType('PING')
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' });

const esriModulesEpic = (action$, state$) => {
  return action$.ofType('LOAD_ESRI_MODULES')
    .switchMap(q => from(loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Track',
      'esri/widgets/Search',
      'esri/tasks/Locator',
      'esri/Graphic',
      'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol',
    ], {
      // url: 'https://js.arcgis.com/4.4/'
    })))
    .map(([Map, MapView, Track, Search, Locator, Graphic, Point, SimpleMarkerSymbol]) => (
      { type: 'MODULES_LOADED', payload: { Map, MapView, Track, Search, Locator, Graphic, Point, SimpleMarkerSymbol } }
    ))
}


const modulesLoaded = (action$, state$) => {
  return action$.ofType('MODULES_LOADED').mergeMap(q => {
    const map = new q.payload.Map({ basemap: 'osm' });
    let view = new q.payload.MapView({
      container: 'viewMap',
      map,
      center: [31.2, 30],
      zoom: 5,
    });
    const track = new state$.value.esriStore.Track({ view });
    const searchWidget = new state$.value.esriStore.Search({ view });
    view.ui.add(track, 'top-left');
    view.ui.add(searchWidget, {
      position: 'top-left',
      index: 2
    });
    const sub = new Subject()
    view.on('drag', (x) => sub.next(true))
    view.on('mouse-wheel', (x) => sub.next(true))
    view.on('hold', (x) => sub.next(true))
    sub.throttleTime(500).subscribe(()=>{
      store.dispatch({type: 'LAZY_LOAD_NEW_DATA'})
    })
    return Observable.of(view)
  }).mergeMap(view=>Observable.concat(
    Observable.of({ type: 'SAVE_VIEW', payload: view}),
    Observable.of({ type: 'LAZY_LOAD_NEW_DATA'})
  )).takeUntil(action$.ofType('LOGGED_OUT'))
}

const filterBikes = (action$, state$) => {
  return action$.ofType('FILTER_BIKES')
  .mergeMap(ac=>Observable.concat(
    Observable.of({type:'SAVE_FILTER', payload: ac.payload}),
    Observable.of({type:'LAZY_LOAD_NEW_DATA'})
  ))
}

const lazyLoadData = (action$, state$) => {
  return action$.ofType('LAZY_LOAD_NEW_DATA').mergeMap(q => {
    const center = state$.value.esriStore.view.center
    return from(ApiService.getBikesByLocation(center.longitude, center.latitude))
  }).map(newPoints=>({type:'RENDER_NEW_POINTS', payload:newPoints}))
    
}


const renderNewPoints = (action$, state$) => {
  return action$.ofType('RENDER_NEW_POINTS').mergeMap(q => {
    graphicsService.setGraphicsFromData(q.payload)
    return Observable.of(true)
  }).map(newPoints=>({type:'NEW_POINTS_RENDERED', payload:newPoints}))
    
}


export const rootEpic = combineEpics(pingEpic, esriModulesEpic, modulesLoaded, lazyLoadData, renderNewPoints, filterBikes)





// 

// {

//   .map(cart => actions.checkoutSuccess(cart))

    // this.props.modulesLoaded({ view, Track, Search, Locator, Graphic, Point, SimpleMarkerSymbol })
        // assignMapEventHandlers(view, Locator)
