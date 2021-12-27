export default function flex() {
    return (
        <View style={{
            padding: 50,
            height: 300,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'stretch'
        }}>

            <View
                style={{
                    backgroundColor: 'red',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>1</Text>
            </View>

            <View
                style={{
                    backgroundColor: 'pink',
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>2</Text>
            </View>

            <View
                style={{
                    backgroundColor: 'yellowgreen',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>3</Text>
            </View>

        </View>
    );
}