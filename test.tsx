/**
 * This example cannot compile with typescript < 2.1.4 where the error is already present.
 */

import {Repeat, Observable, d} from 'domic'

/**
 * In domic, an Observable is a container object that holds a value and
 * alerts subscribers whenever this value (or a subvalue) changes
 */
var arr = new Observable({a: [1, 2, 3]})

/**
 * Here, arr.p('a') gives us a PropObservable<{a: number[]}, number[]>,
 * which is itself an Observable<number[]> since PropObservable is a subclass of it.
 *
 * The Repeat() function acts as some kind of a map() method, taking an Observable<T[]>
 * and receiving a callback expecting a T. So far, the inferer never made any problem
 * and always guessed right.
 *
 * Unfortunately, since at least 2.1.4, the Repeat call is typed as
 * Repeat<any>(...) instead of the correct type.
 *
 * This is a problem in itself alright, but more upsetting is the fact that even
 * with noImplicitAny there is no error !
 *
 * I introduced someNonExistentMethod() on purpose to try to check whenever
 * value is not typed as any.
 */
document.body.appendChild(Repeat(arr.p('a'), value =>
  d('div', {}, value.someNonExistentMethod())
))

/**
 * When helping the type inferer by telling it that prop_a is in fact
 * an Observable<number[]>, the Repeat() call gets typed correctly.
 */
document.body.appendChild(Repeat(arr.p('a') as Observable<number[]>, value =>
  d('div', {}, value.someNonExistentMethod())
))

/**
 * All in all, when running "npm run build", there should be two errors, not just one.
 */