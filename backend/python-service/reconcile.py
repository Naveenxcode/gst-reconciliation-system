import pandas as pd
import sys
import json

def normalize_invoice(inv):
    return str(inv).replace("-", "").replace(" ", "").upper()

def reconcile(purchase_file, gstr2b_file):
    purchase = pd.read_excel(purchase_file)
    gstr2b = pd.read_excel(gstr2b_file)

    # Normalize invoice numbers
    purchase["invoice_no"] = purchase["invoice_no"].apply(normalize_invoice)
    gstr2b["invoice_no"] = gstr2b["invoice_no"].apply(normalize_invoice)

    results = []

    # Convert to dict for faster lookup
    gstr2b_dict = {
        (row["gstin"], row["invoice_no"]): row["amount"]
        for _, row in gstr2b.iterrows()
    }

    purchase_dict = {
        (row["gstin"], row["invoice_no"]): row["amount"]
        for _, row in purchase.iterrows()
    }

    # Check purchase vs 2B
    for key, amount in purchase_dict.items():
        if key in gstr2b_dict:
            if amount == gstr2b_dict[key]:
                status = "MATCHED"
            else:
                status = "MISMATCH_AMOUNT"
        else:
            status = "MISSING_IN_2B"

        results.append({
            "gstin": key[0],
            "invoice_no": key[1],
            "status": status
        })

    # Check extra in 2B
    for key in gstr2b_dict:
        if key not in purchase_dict:
            results.append({
                "gstin": key[0],
                "invoice_no": key[1],
                "status": "MISSING_IN_BOOKS"
            })
            
    return results

if __name__ == "__main__":
    purchase_file = sys.argv[1]
    gstr2b_file = sys.argv[2]

    result = reconcile(purchase_file, gstr2b_file)

    print(json.dumps(result))

