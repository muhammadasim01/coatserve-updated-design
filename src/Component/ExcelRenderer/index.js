import React, { Component } from "react";
import XLSX from "xlsx";
import { Table } from "react-bootstrap";

export class OutTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={this.props.className}>
        <table
          className={`table table-striped table-bordered ${this.props.tableClassName}`}
          responsive
        >
          {this.props.data.map((r, i) => {
            return i === 0 ? (
              <thead>
                <tr key={i}>
                  {!this.props.withoutRowNum && (
                    <th
                      key={i}
                      className={`font-weight-bold ${this.props.tableHeaderRowClass}`}
                    >
                      {this.props.renderRowNum
                        ? this.props.renderRowNum(r, i)
                        : i}
                    </th>
                  )}
                  {this.props.columns.map((c) => (
                    <td key={c.key}>{r[c.key]}</td>
                  ))}
                </tr>
              </thead>
            ) : (
              <tbody>
                <tr key={i}>
                  {!this.props.withoutRowNum && (
                    <td key={i} className={this.props.tableHeaderRowClass}>
                      {this.props.renderRowNum
                        ? this.props.renderRowNum(r, i)
                        : i}
                    </td>
                  )}
                  {this.props.columns.map((c) => (
                    <td key={c.key}>{r[c.key]}</td>
                  ))}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export function ExcelRenderer(file, callback) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    var rABS = !!reader.readAsBinaryString;
    reader.onload = function (e) {
      var bstr = e.target.result;
      var wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      var wsname = wb.SheetNames[0];
      var ws = wb.Sheets[wsname];

      var json = XLSX.utils.sheet_to_json(ws, { header: 1 });
      var cols = make_cols(ws["!ref"]);

      var data = { rows: json, cols: cols };

      resolve(data);
      return callback(null, data);
    };
    if (file && rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  });
}

function make_cols(refstr) {
  var o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) {
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  }
  return o;
}
