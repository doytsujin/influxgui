package main

import (
	"container/list"
	"fmt"

	"github.com/tidwall/buntdb"
	"github.com/zserge/webview"
)

func setupDB(w webview.WebView) (*buntdb.DB, error) {
	db, err := buntdb.Open("influxConfigs.db")
	if err != nil {
		createAlertDialog(w, "could not open db", err.Error())
	}
	return db, err
}

func addInfluxDBConfig(w webview.WebView, db *buntdb.DB, host string) error {
	connections, _ := getInfluxDBConfigs(w, db)
	exists := false
	for connection := connections.Front(); connection != nil; connection = connection.Next() {
		if host == connection.Value {
			exists = true
		}
	}
	if !exists {
		err := db.Update(func(tx *buntdb.Tx) error {
			_, _, err := tx.Set(host, host, nil)
			return err
		})
		if err != nil {
			createAlertDialog(w, "Could not save to database", err.Error())
		} else {
			if host != "http://localhost:8086" {
				createAlertDialog(w, "Config saved", host)
			}
		}
		return err
	} else {
		if host != "http://localhost:8086" {
			createAlertDialog(w, "Hostname exists already", host)
		}
	}
	return nil

}

func getInfluxDBConfigs(w webview.WebView, db *buntdb.DB) (*list.List, error) {
	connections := list.New()
	err := db.View(func(tx *buntdb.Tx) error {
		tx.Ascend("", func(key, val string) bool {
			connections.PushBack(val)
			fmt.Printf("%s %s\n", key, val)
			return true
		})
		return nil
	})
	return connections, err
}
