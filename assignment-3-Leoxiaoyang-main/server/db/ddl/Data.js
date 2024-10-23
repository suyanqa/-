/*
 Navicat Premium Data Transfer

 Source Server         : Mongo_1
 Source Server Type    : MongoDB
 Source Server Version : 50014
 Source Host           : localhost:27017
 Source Schema         : tickettoride

 Target Server Type    : MongoDB
 Target Server Version : 50014
 File Encoding         : 65001

 Date: 20/10/2024 02:07:40
*/


// ----------------------------
// Collection structure for Data
// ----------------------------
db.getCollection("Data").drop();
db.createCollection("Data");

// ----------------------------
// Documents of Data
// ----------------------------
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223a"),
    key: 0,
    name: "John Doe",
    phone: "13800138000",
    seatStatus: "Reserved",
    seatNumber: "1A",
    date: "2024-09-05",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223b"),
    key: 1,
    name: "Jane Smith",
    phone: "13800138001",
    seatStatus: "Reserved",
    seatNumber: "2B",
    date: "2024-09-06",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223c"),
    key: 2,
    name: "Michael Johnson",
    phone: "13800138002",
    seatStatus: "Not Reserved",
    seatNumber: "3C",
    date: "2024-09-07",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223d"),
    key: 3,
    name: "Emily Davis",
    phone: "13800138003",
    seatStatus: "Reserved",
    seatNumber: "4D",
    date: "2024-09-08",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223e"),
    key: 4,
    name: "Chris Brown",
    phone: "13800138004",
    seatStatus: "Not Reserved",
    seatNumber: "5E",
    date: "2024-09-09",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a800223f"),
    key: 5,
    name: "Sarah Wilson",
    phone: "13800138005",
    seatStatus: "Reserved",
    seatNumber: "6F",
    date: "2024-09-10",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a8002240"),
    key: 6,
    name: "David Taylor",
    phone: "13800138006",
    seatStatus: "Not Reserved",
    seatNumber: "7G",
    date: "2024-09-11",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a8002241"),
    key: 7,
    name: "Laura Anderson",
    phone: "13800138007",
    seatStatus: "Reserved",
    seatNumber: "8H",
    date: "2024-09-12",
    blacklist: false
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a8002242"),
    key: 8,
    name: "Daniel White",
    phone: "13800138008",
    seatStatus: "Not Reserved",
    seatNumber: "9I",
    date: "2024-09-13",
    blacklist: true
} ]);
db.getCollection("Data").insert([ {
    _id: ObjectId("6710f69b3a100000a8002243"),
    key: 9,
    name: "Sophia Martinez",
    phone: "13800138009",
    seatStatus: "Reserved",
    seatNumber: "10J",
    date: "2024-09-14",
    blacklist: true
} ]);
