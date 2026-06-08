import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {routes} from "./router/routes.tsx";
import {RouterProvider} from "react-router-dom";
import {store} from "./redux/store.ts";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
     <RouterProvider router={routes}/>
     </Provider>
)
