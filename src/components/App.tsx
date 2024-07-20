// import Avatar from 'components/Avatar';
// import logo from 'assets/logo.svg';
import TransactionModel from 'models/transaction';
import Category from 'models/category';
// import TransactionList from 'components/transaction-list';
import Account from 'pages/account';

// const randoms = [
//     [1, 2],
//     [3, 4, 5],
//     [6, 7]
// ];

function App() {
    const transactions: TransactionModel[] = [];
    const transaction = new TransactionModel(1);
    const transaction2 = new TransactionModel(2);
    const transaction3 = new TransactionModel(3);
    transaction.category = new Category('categoria', 1);
    transaction.date = new Date();
    transaction.description = 'Today';
    transaction.value = 1;
    transaction2.category = new Category('caregotia', 2);
    transaction2.date = new Date();
    transaction2.description = 'Today';
    transaction2.value = -1;
    transaction3.category = new Category('categoria', 3);
    transaction3.date = new Date();
    transaction3.description = 'Today';
    transaction3.value = 3;
    transactions.push(transaction);
    transactions.push(transaction2);
    transactions.push(transaction3);
    return (
        // <div className="lg:flex lg:flex-col">
        //     <div className="relative w-full overflow-hidden bg-white">
        /* <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <div className="my-4">
                            <Avatar size="large" src={logo} />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome!
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            This is a boilerplate build with Vite, React 18,
                            TypeScript, Vitest, Testing Library, TailwindCSS 3,
                            Eslint and Prettier.
                        </p>
                    </div>
                    <div className="my-10">
                        <a
                            href="vscode://"
                            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                        >
                            Start building for free
                        </a>
                        <div
                            aria-hidden="true"
                            className="pointer-events-none mt-10 md:mt-0 lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                        >
                            <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                <div className="flex items-center space-x-6 lg:space-x-8">
                                    {randoms.map((random, number) => (
                                        <div
                                            key={`random-${random[number]}`}
                                            className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                                        >
                                            {random.map((number) => (
                                                <div
                                                    key={`random-${number}`}
                                                    className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                                                >
                                                    <img
                                                        src={`https://picsum.photos/600?random=${number}`}
                                                        alt=""
                                                        className="size-full bg-indigo-100 object-cover object-center"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */
        <Account key="account" transactions={transactions} />
        /* </div>
        </div> */
    );
}

export default App;
