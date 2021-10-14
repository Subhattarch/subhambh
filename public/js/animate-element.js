import { getAsArray } from "./small-functions.js"
import "./modules/jquery.min.js.js"
export default (
    mainNames,
    intervals,
    maxIteration,
    iterationCallbacks,
    endCallback,
    animationClassNames,
    iterationStart = 1
) => {
    const MainNames = getAsArray(mainNames)
    const Intervals = getAsArray(intervals)
    const IterationCallbacks = getAsArray(iterationCallbacks)
    const AnimationClassNames = getAsArray(animationClassNames)
    let iteration = iterationStart
    let index = 0;
    setTimeout(function animationCore () {
        if(iteration > maxIteration) {
            if(typeof(endCallback) === "function") setTimeout(
                () => endCallback(),
                Intervals[
                    index % Intervals.length
                ]
            )
            return
        }
        const AnimationClassName = AnimationClassNames[
            index % AnimationClassNames.length
        ]
        if( AnimationClassName != null) AnimationClassName.replace(
            /\$/g, iteration
        )
        const MainName = MainNames[
            index % MainNames.length
        ].replace(/\$/g, iteration)
        $(
            MainName
        ).addClass(
            AnimationClassName ?? "animation"
        )
        const Interval = Intervals[
            index % Intervals.length
        ]
        let IterationCallback = IterationCallbacks[
            index % IterationCallbacks.length
        ]
        if(typeof(IterationCallback) === "function") IterationCallback(MainName, Interval, iteration, AnimationClassName)
        ++iteration
        ++index
        setTimeout(
            animationCore,
            Interval
        )
    }, Intervals[0])
}