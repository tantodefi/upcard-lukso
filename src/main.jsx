import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.scss'
import './styles/global.scss'

import ErrorPage from './error-page'
const Layout = lazy(() => import('./routes/layout.jsx'))
import SplashScreen, { loader as splashScreenLoader } from './routes/splashScreen.jsx'
import Tour, { loader as tourLoader } from './routes/tour.jsx'
import Home from './routes/home.jsx'
import Usr, { loader as usrLoader } from './routes/usr.jsx'
import Contact from './routes/contact.jsx'
import Feedback from './routes/feedback.jsx'
import About from './routes/about.jsx'
import FAQ from './routes/faq.jsx'
import Loading from './routes/components/LoadingSpinner'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: splashScreenLoader,
        element: <SplashScreen title={`Welcome`} />,
      },
      {
        path: 'tour',
        loader: tourLoader,
        element: <Tour title={`Features`} />,
      },
      {
        path: 'home',
        element: <Home title={`Home`} />,
      },
      {
        path: 'about',
        element: <About title={`About`} />,
      },
      {
        path: 'feedback',
        element: <Feedback title={`Feedback`} />,
      },
      {
        path: 'card',
        element: (
          <AuthProvider>
            <>card</>
          </AuthProvider>
        ),
      },
      {
        path: 'usr',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/" replace />,
          },
          {
            path: ':addr',
            loader: usrLoader,
            // action: addressAction,
            element: <Usr />,
          },
        ],
      },
      {
        path: 'faq',
        loader: () => {
          return true
        },
        element: <FAQ />,
      },
      {
        path: 'contact',
        loader: () => {
          return true
        },
        element: <Contact />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
