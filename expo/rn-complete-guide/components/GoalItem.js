import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

const GoalItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onDelete.bind(this, props.id)}
    >
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f5f3f2",
    borderColor: "#b3b3b3",
    borderWidth: 1,
  },
});

export default GoalItem;
