package main

import (
	"encoding/json"

	"github.com/boltdb/bolt"
	"github.com/zserge/webview"
)

func setupDB(w webview.WebView) (*bolt.DB, error) {
	db, err := bolt.Open("influxConfigs.db", 0600, nil)
	if err != nil {
		createAlertDialog(w, "could not open db", err.Error())
		return nil, err
	}
	return db, nil
}

func addInfluxDBConfig(w webview.WebView, db *bolt.DB, host string) error {
	entry := InfluxDBConnection{Host: host, Username: "", Password: "", Error: false, ErrorMessage: ""}
	entryBytes, err := json.Marshal(entry)
	if err != nil {
		createAlertDialog(w, "could not marshal entry json", err.Error())
		return err
	}
	err = db.Update(func(tx *bolt.Tx) error {
		err := tx.Bucket([]byte("DB")).Bucket([]byte("ENTRIES")).Put([]byte("CONFIG"), entryBytes)
		if err != nil {
			createAlertDialog(w, "could not insert entry", err.Error())
			return err
		}

		return nil
	})
	createAlertDialog(w, "Config saved", host)
	return err
}
