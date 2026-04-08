import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import os

# 1. Configuration - Pointing directly to your file
DATA_FILE = 'dataset.csv' 
TARGET_COLUMN = 'Dosha'
MODEL_FILE = 'prakriti_model.pkl'
COLUMNS_FILE = 'model_columns.pkl'
ENCODER_FILE = 'dosha_encoder.pkl'

def train_and_save_model():
    """Loads data, trains the Random Forest classifier, and saves the assets."""
    
    # Check if the file actually exists before starting
    if not os.path.exists(DATA_FILE):
        print(f"❌ Error: {DATA_FILE} not found in the current folder!")
        print("Please make sure your CSV is named 'dataset.csv' and is inside the backend folder.")
        return

    print(f"📂 Loading data from {DATA_FILE}...")
    df = pd.read_csv(DATA_FILE)
    
    # 2. Data Cleaning
    df.dropna(inplace=True)

    # 3. Separate Features (X) and Target (Y)
    X = df.drop(columns=[TARGET_COLUMN])
    y = df[TARGET_COLUMN]

    # 4. Target Encoding (Y)
    y_encoder = LabelEncoder()
    y_encoded = y_encoder.fit_transform(y)
    
    # 5. Feature Encoding (X) - One-Hot Encoding
    # This is what creates those 100+ columns based on your questions
    X_encoded = pd.get_dummies(X, drop_first=False)
    
    # 6. Prepare for Training
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )

    # 7. Model Training
    print("🌲 Training RandomForest model (100 trees)...")
    model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight='balanced')
    model.fit(X_train, y_train)
    
    accuracy = model.score(X_test, y_test)
    print(f"✅ Model trained. Test Accuracy: {accuracy:.4f}")

    # 8. Save the Assets (The "Contract" for the API)
    model_columns = X_encoded.columns.tolist()
    
    print(f"💾 Saving assets to backend folder...")
    
    joblib.dump(model, MODEL_FILE)
    joblib.dump(model_columns, COLUMNS_FILE)
    joblib.dump(y_encoder, ENCODER_FILE)

    print(f"🚀 SUCCESS: {MODEL_FILE}, {COLUMNS_FILE}, and {ENCODER_FILE} are ready.")

if __name__ == "__main__":
    train_and_save_model()