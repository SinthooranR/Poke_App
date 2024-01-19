import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import CloseIcon from "../Icons/CloseIcon";

interface MoveDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  flavorText?: string;
  effectDescription?: string;
}

const MoveModal: React.FC<MoveDetailsModalProps> = ({
  isVisible,
  onClose,
  flavorText,
  effectDescription,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>

          <View style={styles.descContainer}>
            <Text style={styles.subHeader}>Description</Text>
            <Text style={styles.descriptionText}>{flavorText}</Text>

            <Text style={styles.subHeader}>Effect</Text>
            <Text style={styles.descriptionText}>{effectDescription}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "80%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  descContainer: {
    marginTop: 0,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MoveModal;
