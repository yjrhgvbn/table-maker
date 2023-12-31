import LoadingOrError from 'components/LoadingOrError'
import Import from 'pages/Import'
import Home from 'pages/TableMaker'
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// const Home = lazy(async () => import('pages/TableMaker'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/import' element={<Import />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
