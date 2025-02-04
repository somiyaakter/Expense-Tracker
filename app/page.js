'use client'

import { useState, useEffect } from 'react'

export default function ExpenseTracker() {
	const [expenses, setExpenses] = useState([])
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		const amount = parseFloat(e.target.amount.value)
		const description = e.target.description.value
		if (!amount || !description) return
		// const newExpense = { id: Date.now(), amount, description }
		setExpenses(prevExpenses => [
			...prevExpenses,
			{ id: Date.now(), amount, description },
		])
		setAmount('')
		setDescription('')
		e.target.reset()
	}

	useEffect(() => {
		const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || []
		setExpenses(savedExpenses)
	}, [])

	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses))
	}, [expenses])

	const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

	function handleDelete(id) {
		const updatedExpenses = expenses.filter(expense => expense.id !== id)
		setExpenses(updatedExpenses)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6">
			<div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8">
				<h1 className="text-3xl italic font-bold text-center mb-4 text-orange-500">
					Expense Tracker
				</h1>

				{/* Total Display */}
				<div className="text-center mb-8">
					<h2 className="text-2xl font-semibold text-gray-800">
						Total: <span className="text-orange-500">${total.toFixed(2)}</span>
					</h2>
				</div>

				{/* Expense Form */}
				<div className="mb-8">
					<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
						<input
							type="number"
							name="amount"
							placeholder="Amount"
							className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							required
						/>
						<input
							type="text"
							name="description"
							placeholder="Description"
							className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							required
						/>
						<button
							type="submit"
							className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 "
						>
							Add Expense
						</button>
					</form>
				</div>

				{/* Expense History */}
				<div className="mb-6">
					<h3 className="font-semibold text-xl text-gray-800 mb-6">
						Expense History
					</h3>
					<div className="space-y-3">
						{expenses.map(expense => (
							<div
								key={expense.id}
								className="flex justify-between items-center  p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
							>
								<p className="font-medium text-gray-800">
									{expense.description}
								</p>

								<div className="flex items-center gap-4">
									<p className="text-gray-700 font-semibold">
										${expense.amount.toFixed(2)}
									</p>

									<button
										onClick={() => handleDelete(expense.id)}
										className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 transition-all"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
