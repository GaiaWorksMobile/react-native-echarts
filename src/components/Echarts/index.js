import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import Device from 'react-native-device-detection';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    console.log('height is',this.props.height || 400);
    console.log('width is',this.props.width || Device.width);
    return (
      <View style={{ flex: 1, height: this.props.height || 400, width: this.props.width || Device.width }}>
        <WebView
          ref="chart"
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            width: this.props.width || Device.width,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={!Device.isIos}
          scrollEnabled={false}
          source={Platform.OS === 'ios' ? {uri:'./tpl.html'} : {uri:'file:///android_asset/tpl.html'}}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
