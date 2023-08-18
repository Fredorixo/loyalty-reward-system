export default {
    "home": {
        "title": "home",
        "data": [
            {
                "image": "hexagon",
                "name": "Supply",
                "method": "getPoints",
                "param": null,
                "currency": "hexagon",
                "value": undefined
            }
        ]
    },
    "account_balance_wallet": {
        "title": "wallet",
        "data": [
            {
                "image": "wallet",
                "name": "Balance",
                "method": "balance",
                "param": null,
                "currency": "hexagon",
            }
        ]
    },
    "contract_edit": {
        "title": "create loyalty points",
        "data": [
            {
                "image": "hexagon",
                "name": "Loyalty Points",
                "method": "setPoints",
                "currency": "",
                "action": "Publish"
            }
        ]
    },
    "change_circle": {
        "title": "switch accounts",
        "data": [
            {
                "id": "ONE",
                "name": "Admin",
                "image": "person",
                "value": "0x91",
                "currency": "tag",
                "action": "Switch"
            },
            {
                "id": "TWO",
                "name": "Alice",
                "image": "person",
                "currency": "tag",
                "value": "0x95",
                "action": "Switch"
            },
            {
                "id": "THREE",
                "name": "Bob",
                "image": "person",
                "currency": "tag",
                "value": "0x98",
                "action": "Switch"
            }
        ]
    },
    "redeem": {
        "title": "redeemable items",
        "data": [
            {
                "name": "Watch",
                "image": "inventory_2",
                "currency": "hexagon",
                "action": "Redeem",
                "method": "deductPoints",
                "param": "250",
                "value": 250
            },
            {
                "name": "Gaming Mouse",
                "image": "inventory_2",
                "currency": "hexagon",
                "action": "Redeem",
                "method": "deductPoints",
                "param": "150",
                "value": 150
            },
            {
                "name": "Keyboard",
                "image": "inventory_2",
                "currency": "hexagon",
                "action": "Redeem",
                "method": "deductPoints",
                "param": "100",
                "value": 100
            }
        ]
    },
    "receipt_long": {
        "title": "history",
        "data": []
    },
    "shopping_cart": {
        "title": "store",
        "data": [
            {
                "name": "Dress",
                "image": "inventory_2",
                "currency": "currency_rupee",
                "action": "Purchase",
                "method": "addPoints",
                "param": "250",
                "value": 5000
            },
            {
                "name": "Gaming Mouse",
                "image": "inventory_2",
                "currency": "currency_rupee",
                "action": "Purchase",
                "method": "addPoints",
                "param": "75",
                "value": 1500
            },
            {
                "name": "Jeans",
                "image": "inventory_2",
                "currency": "currency_rupee",
                "action": "Purchase",
                "method": "addPoints",
                "param": "150",
                "value": 3000
            }
        ]
    },
    "settings": {
        "title": "settings",
        "data": []
    },
    "help": {
        "title": "help",
        "data": []
    }
}