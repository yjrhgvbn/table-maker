declare module 'state/middleware/type' {
	/**
	 * should be a key-value pair，value should be a object type.
	 *
	 * will ingore the key, filter out all attributes and conversion to intersection type
	 * @example
	 * ```ts
	 * interface GlobalState {
	 * 	anykey: { name: string }
	 * }
	 * ```
	 */
	interface StateMutators {}

	/** same as StateMutators, setting computed type */
	interface ComputedSateMutators {}
}
