import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ButtonInput } from "./components/button";
export default function App() {
  const [expression, setExpression] = useState("_");
  const [viewTextColor, setViewTextColor] = useState("#fff");
  const handleInput = (value: string) => {
    setExpression((prev) => {
      if (
        (prev === "Error of expression" || prev === "Infinity") &&
        value !== "AC" &&
        value !== "C" &&
        value !== "="
      ) {
        return value;
      }
      if (value == "." && prev[prev.length - 1] == ".") {
        return prev;
      }
      if (prev === "0" && value === "0") {
        return "0";
      }

      if (prev === "_") {
        prev = "";
      }
      if (value === "AC") {
        return "_";
      }
      if (value === "C") {
        return prev.substring(0, prev.length - 1);
      }
      if (value === ".") {
        return (prev += value);
      }
      if (value === "=") {
        try {
          const result = String(eval(prev));
          if (result === "NaN") {
            return `Error of expression`;
          }
          return result;
        } catch (err) {
          return `Error of expression`;
        }
      }
      // removing last dots

      return `${prev}${value}`;
    });
  };
  useEffect(() => {
    if (
      expression === "Error of expression" ||
      expression === "Infinity" ||
      expression === "NaN"
    ) {
      setViewTextColor("red");
    } else {
      setViewTextColor("#fff");
    }
  }, [expression]);

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor="#fff" />
      <View style={styles.visor}>
        <Text
          style={{
            color: viewTextColor,
            alignSelf: "flex-end",
            fontSize: 32,
            paddingRight: 30,
          }}
        >
          {expression}
        </Text>
      </View>
      <View style={styles.keyboards}>
        <View style={styles.keyboard}>
          <ButtonInput
            label="AC"
            handleEvent={handleInput}
            color="rgba(100,50,100,1)"
          />
          <ButtonInput
            label="C"
            handleEvent={handleInput}
            color="rgba(100,50,100,1)"
          />
          <ButtonInput
            label="/"
            handleEvent={handleInput}
            color="rgb(200,200,20)"
          />
          <ButtonInput
            label="*"
            handleEvent={handleInput}
            color="rgb(200,200,20)"
          />
        </View>
        <View style={styles.keyboard}>
          <ButtonInput label="7" handleEvent={handleInput} />
          <ButtonInput label="8" handleEvent={handleInput} />
          <ButtonInput label="9" handleEvent={handleInput} />
          <ButtonInput
            label="-"
            handleEvent={handleInput}
            color="rgb(200,200,20)"
          />
        </View>
        <View style={styles.keyboard}>
          <ButtonInput label="4" handleEvent={handleInput} />
          <ButtonInput label="5" handleEvent={handleInput} />
          <ButtonInput label="6" handleEvent={handleInput} />
          <ButtonInput
            label="+"
            handleEvent={handleInput}
            color="rgb(200,200,20)"
          />
        </View>
        <View style={styles.keyboard}>
          <ButtonInput label="1" handleEvent={handleInput} />
          <ButtonInput label="2" handleEvent={handleInput} />
          <ButtonInput label="3" handleEvent={handleInput} />
          <ButtonInput
            label="."
            handleEvent={handleInput}
            color="rgb(200,200,20)"
          />
        </View>
        <View style={styles.keyboard}>
          <ButtonInput label="0" handleEvent={handleInput} size={3} />
          <ButtonInput
            label="="
            handleEvent={handleInput}
            color="rgb(0,200,100)"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    paddingTop: 50,
  },
  visor: {
    width: "90%",
    height: 75,
    backgroundColor: "#444",
    borderRadius: 5,
    justifyContent: "center",
  },
  visorText: {},
  keyboards: {
    marginTop: 30,
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboard: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
