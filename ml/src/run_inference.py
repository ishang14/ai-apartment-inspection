from inference import predict_image


IMAGE_PATH = r"D:\ai-apartment-inspection\dataset\major_crack\cls01_154.jpg"


result = predict_image(IMAGE_PATH)


print("\nPrediction Result")
print("-----------------")

print("Prediction:", result["prediction"])
print(f"Confidence: {result['confidence'] * 100:.2f}%")
print("Severity:", result["severity"])

print("\nTop 3 predictions:")

for item in result["top_predictions"]:
    print(
        f"{item['class']:15s}"
        f"{item['confidence'] * 100:.2f}%"
    )