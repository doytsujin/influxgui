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
	err := db.Update(func(tx *buntdb.Tx) error {
		_, _, err := tx.Set(host, host, nil)
		return err
	})
	if err != nil {
		createAlertDialog(w, "Could not save to database", err.Error())
	} else {
		createAlertDialog(w, "Config saved", host)
	}
	return err
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
	/*err := db.View(func(tx *buntdb.Tx) error {
		err := tx.Ascend("", func(key, value string) bool {
			fmt.Printf("key: %s, value: %s\n", key, value)
			return false
		})
		err = nil
		return err
	})*/
	return connections, err
}
