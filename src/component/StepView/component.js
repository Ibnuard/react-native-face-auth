import * as React from 'react'
import { View } from 'react-native'
import { Scaler } from '../../styles'

const StepView = ({ step = 0, progress = 0, colorInactive, colorActive, onComplete }) => {
    const [stepCount, setStepCount] = React.useState(null)

    React.useEffect(() => {
        initial()
    }, [step])

    function initial() {
        let temp = []
        for (let i = 0; i < step; i++) {
            temp.push(i)
        }
        setStepCount(temp)
    }

    return (
        <View style={{ flexDirection: 'row', paddingVertical: Scaler.scaleSize(12) }}>
            {
                stepCount ?
                    stepCount.map((item, index) => {
                        return (
                            <View key={index} style={{ backgroundColor: progress >= index ? 'blue' : 'gray', height: 10, width: 60, borderRadius: 25 }} />
                        )
                    }) : null
            }
        </View>
    )
}

export default StepView