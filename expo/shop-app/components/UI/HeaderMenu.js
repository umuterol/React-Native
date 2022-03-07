import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constans/Colors';

const HeaderMenu = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onSelect}
            style={{ marginRight: 30 }}
        >
            <Ionicons name='menu' size={30} color='white' />
        </TouchableOpacity>
    )
}

export default HeaderMenu

