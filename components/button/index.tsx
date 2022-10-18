import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface IButtonProps {
  label: string;
  handleEvent: (value: string) => void;
  color?: string;
  size?: number;
  sizeY?: number;
}
export const ButtonInput = ({
  label,
  handleEvent,
  color,
  size,
  sizeY,
}: IButtonProps) => {
  const handlePress = () => {
    return handleEvent(label);
  };
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: size ? size * 80 : "23%",
        height: sizeY ? sizeY * 75 : 75,
        borderRadius: 10,
        backgroundColor: color ? color : "#555",
      }}
      onPress={handlePress}
    >
      <Text style={{ fontSize: 32, color: "#fff" }}>{label}</Text>
    </TouchableOpacity>
  );
};
