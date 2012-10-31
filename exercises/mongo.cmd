@echo off
setlocal enableextensions

if not exists ./mongo mkdir mongo

mongod --journal --dbpath ./mongo