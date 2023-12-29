interface props {
	message: string;
}

export default function Main({ message }: props) {
	return <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">Hola mundo {message}</div>;
}
