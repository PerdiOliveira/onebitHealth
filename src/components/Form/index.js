import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageIMC, setMessageIMC] = useState("Preencha seu peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  function imcCalculator() {
    return setImc((weight / height ** 2).toFixed(2));
  }

  function verificationIMC() {
    imc == null
      ? (Vibration.vibrate(), setErrorMessage("campo obrigatório"))
      : setErrorMessage(null);
  }

  function validationIMC() {
    weight != null && height != null
      ? (imcCalculator(),
        setHeight(null),
        setWeight(null),
        setMessageIMC("seu imc é igual:"),
        setTextButton("Calcular Novamente"),
        setErrorMessage(null))
      : (setImc(null),
        setTextButton("Calcular"),
        setMessageIMC("Preencha Peso e Altura"),
        verificationIMC());
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>
          {height == null ? errorMessage : " "}
        </Text>
        <TextInput
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
          style={styles.formInput}
        />
        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>
          {weight == null ? errorMessage : ""}
        </Text>
        <TextInput
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 100.75"
          keyboardType="numeric"
          style={styles.formInput}
        />
        <TouchableOpacity
          onPress={() => validationIMC()}
          style={styles.formButton}
        >
          <Text style={styles.formTextButton}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultIMC messageResultIMC={messageIMC} resultIMC={imc} />
    </View>
  );
}
