import Header from './components/layouts/Header';
import Board from './components/Board';

function App() {
	return (
		<main className='h-screen w-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col items-center'>
			<Header />
			<div className='flex-1 flex items-center justify-center'>
				<Board />
			</div>
		</main>
	);
}

export default App;
