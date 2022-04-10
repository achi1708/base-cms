import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	decrement,
	increment,
	incrementByAmount,
	incrementAsync,
	incrementIfOdd,
	selectCount,
} from './counterSlice'
import styles from './Counter.module.css'

import {
	setToken,
	removeToken,
	selectToken,
	selectData
} from '../../reducers/userSlice'

export function Counter() {
	const count = useSelector(selectCount)
	const dispatch = useDispatch()
	const [incrementAmount, setIncrementAmount] = useState('2')

	const incrementValue = Number(incrementAmount) || 0

	const user = useSelector(selectToken)

	return (
		<div>
			<div className={styles.row}>
				<h1>User</h1>
				<p>{user}</p>

				<button
					className={styles.button}
					aria-label="Set counter as user"
					onClick={() => dispatch(setToken(incrementAmount))}
				>
          Set counter as user
				</button>
				<button
					className={styles.button}
					aria-label="Remove user"
					onClick={() => dispatch(removeToken())}
				>
          Remove user
				</button>
			</div>
			<div className={styles.row}>
				<button
					className={styles.button}
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
          -
				</button>
				<span className={styles.value}>{count}</span>
				<button
					className={styles.button}
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
          +
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={(e) => setIncrementAmount(e.target.value)}
				/>
				<button
					className={styles.button}
					onClick={() => dispatch(incrementByAmount(incrementValue))}
				>
          Add Amount
				</button>
				<button
					className={styles.asyncButton}
					onClick={() => dispatch(incrementAsync(incrementValue))}
				>
          Add Async
				</button>
				<button
					className={styles.button}
					onClick={() => dispatch(incrementIfOdd(incrementValue))}
				>
          Add If Odd
				</button>
			</div>
		</div>
	)
}
