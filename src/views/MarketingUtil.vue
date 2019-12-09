<template>
  <fragment>
    <b-card class="mt-4" header="Advertising / PR">
      <b-form>
        <b-form-group
          id="ig-segment"
          label="Choose segment:"
          label-for="segment"
          description="% is the reach potential of the segment"
        >
          <b-form-select id="segment" v-model="segment" :options="segments" size="lg"></b-form-select>
        </b-form-group>
        <b-form-group
          id="ig-budget"
          label="Your budget:"
          label-for="name"
          description="Only works in increments of $50000"
        >
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="budget"
              v-model="budget"
              type="number"
              min="0"
              max="8400000"
              step="50000"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-for="channel in channels"
          :key="channel"
          :id="'ig-' + channel"
          :label="channel | labelize | capitalize"
          :label-for="channel"
          :description="'Coverage: ' + getChannelCoverage(channel) + '%'"
        >
          <b-input-group size="lg" prepend="$">
            <b-form-input
              :id="channel"
              type="number"
              min="0"
              max="2800000"
              step="50000"
              :value="getChannelAmount(channel)"
              placeholder="0"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="copyToClipboard(getChannelAmount(channel))">Copy</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group
          id="ig-coverage"
          label="Total coverage:"
          label-for="coverage"
          description="Combined channels coverage"
        >
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="coverage"
              type="number"
              min="0"
              step="1"
              :value="overallCoverage"
              placeholder="0"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          id="ig-percent-cost"
          label="Cost per 1%:"
          label-for="percent-cost"
          description="Expense for 1% of the total coverage"
        >
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="percent-cost"
              type="number"
              min="0"
              step="1"
              :value="costPerPercent"
              placeholder="0"
              disabled
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-card>
    <b-card class="mt-4" header="Production">
      <b-form>
        <b-form-group id="ig-demand" label="Forecast Demand:" label-for="demand">
          <b-input-group size="lg">
            <b-form-input
              id="demand"
              v-model="demand"
              type="number"
              min="0"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-market-share" label="Forecast Market Share:" label-for="market-share">
          <b-input-group size="lg" prepend="%">
            <b-form-input
              id="market-share"
              v-model="marketShare"
              type="number"
              min="0"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-production" label="Forecast Production:" label-for="production">
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="production"
              type="number"
              min="0"
              step="1"
              :value="production"
              placeholder="0"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="copyToClipboard(production)">Copy</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-card>
    <b-card class="mt-4" header="Manufacturing">
      <b-form>
        <b-form-group id="ig-total-capacity" label="Total Capacity:" label-for="total-capacity">
          <b-input-group size="lg">
            <b-form-input
              id="total-capacity"
              v-model="totalCapacity"
              type="number"
              min="0"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-efficiency" label="Production Efficiency:" label-for="efficiency">
          <b-input-group size="lg" prepend="%">
            <b-form-input
              id="efficiency"
              v-model="efficiency"
              type="number"
              min="0"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-real-capacity" label="Real Capacity:" label-for="real-capacity">
          <b-input-group size="lg">
            <b-form-input
              id="real-capacity"
              type="number"
              min="0"
              step="1"
              :value="realCapacity"
              placeholder="0"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="copyToClipboard(realCapacity)">Copy</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-card>
    <b-card class="mt-4" header="Design & Development">
      <b-form>
        <b-form-group id="ig-style-exst" label="Existing Style/Design:" label-for="style-exst">
          <b-input-group size="lg">
            <b-form-input
              id="style-exst"
              v-model="styleExst"
              type="number"
              min="0"
              max="100"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          id="ig-specs-exst"
          label="Existing Technical Specifications:"
          label-for="specs-exst"
        >
          <b-input-group size="lg">
            <b-form-input
              id="specs-exst"
              v-model="specsExst"
              type="number"
              min="0"
              max="100"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-style-new" label="New Style/Design:" label-for="style-new">
          <b-input-group size="lg">
            <b-form-input
              id="style-new"
              v-model="styleNew"
              type="number"
              min="0"
              max="100"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-specs-new" label="New Technical Specifications:" label-for="specs-new">
          <b-input-group size="lg">
            <b-form-input
              id="specs-new"
              v-model="specsNew"
              type="number"
              min="0"
              max="100"
              step="1"
              value="0"
              placeholder="0"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-prime-cost" label="Total prime cost:" label-for="prime-cost">
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="prime-cost"
              type="number"
              min="0"
              step="1"
              :value="primeCost"
              placeholder="0"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="copyToClipboard(primeCost)">Copy</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group id="ig-change-cost" label="Total change cost:" label-for="change-cost">
          <b-input-group size="lg" prepend="$">
            <b-form-input
              id="change-cost"
              type="number"
              min="0"
              step="1"
              :value="changeCost"
              placeholder="0"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="copyToClipboard(changeCost)">Copy</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-card>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";

export default {
  name: "MarketingUtil",
  components: {
    Fragment
  },
  props: {},
  data() {
    return {
      segments: [
        {
          value: "none",
          text: "No segment 0%"
        },
        {
          value: "kids",
          text: "Kids segment 110%"
        },
        {
          value: "racers",
          text: "Racers segment 110%"
        },
        {
          value: "commuters",
          text: "Commuters segment 80%"
        },
        {
          value: "leisure",
          text: "Leisure segment 110%"
        },
        {
          value: "adventurers",
          text: "Adventurers segment 120%"
        }
      ],
      channels: ["tv", "internet", "magazines"],
      segment: "none",
      budget: 0,
      demand: 0,
      marketShare: 0,
      totalCapacity: 0,
      efficiency: 0,
      style: 0,
      specs: 0,
      styleExst: 0,
      specsExst: 0,
      styleNew: 0,
      specsNew: 0,
      data: {
        none: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 2.375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 4.75
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 7.125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 9.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 13.35
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 17.2
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 21.05
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 24.9
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 27.425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 29.95
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 32.475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 36.375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 37.75
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 39.125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 41.275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 42.05
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 950000,
              coverage: 42.825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1050000,
              coverage: 44.05
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1100000,
              coverage: 44.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1150000,
              coverage: 44.95
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 650000,
              coverage: 11.75
            }
          },
          "1300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 700000,
              coverage: 13.3
            }
          },
          "1350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 750000,
              coverage: 14.85
            }
          },
          "1400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 800000,
              coverage: 16.4
            }
          },
          "1450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 850000,
              coverage: 17.875
            }
          },
          "1500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 900000,
              coverage: 19.35
            }
          },
          "1550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 950000,
              coverage: 20.825
            }
          },
          "1600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "1650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 36.375
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "1700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 37.75
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "1750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 39.125
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "1800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "1850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1050000,
              coverage: 23.575
            }
          },
          "1900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1100000,
              coverage: 24.85
            }
          },
          "1950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1150000,
              coverage: 26.125
            }
          },
          "2000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1200000,
              coverage: 27.4
            }
          },
          "2050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1250000,
              coverage: 28.45
            }
          },
          "2100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1300000,
              coverage: 29.5
            }
          },
          "2150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1350000,
              coverage: 30.55
            }
          },
          "2200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "2250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1450000,
              coverage: 32.425
            }
          },
          "2300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1500000,
              coverage: 33.25
            }
          },
          "2350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1550000,
              coverage: 34.075
            }
          },
          "2400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "2450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 41.275
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "2500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 42.05
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "2550000": {
            tv: {
              amount: 950000,
              coverage: 20.825
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2600000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 600000,
              coverage: 35
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2650000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 650000,
              coverage: 36.375
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2700000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 700000,
              coverage: 37.75
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2750000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 750000,
              coverage: 39.125
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2800000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1000000,
              coverage: 22.3
            }
          },
          "2850000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1050000,
              coverage: 23.575
            }
          },
          "2900000": {
            tv: {
              amount: 1000000,
              coverage: 22.3
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1100000,
              coverage: 24.85
            }
          },
          "2950000": {
            tv: {
              amount: 1050000,
              coverage: 23.575
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1100000,
              coverage: 24.85
            }
          },
          "3000000": {
            tv: {
              amount: 1050000,
              coverage: 23.575
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1150000,
              coverage: 26.125
            }
          },
          "3050000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1050000,
              coverage: 23.575
            }
          },
          "3100000": {
            tv: {
              amount: 1100000,
              coverage: 24.85
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1200000,
              coverage: 27.4
            }
          },
          "3150000": {
            tv: {
              amount: 1150000,
              coverage: 26.125
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1200000,
              coverage: 27.4
            }
          },
          "3200000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1200000,
              coverage: 27.4
            }
          },
          "3250000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1250000,
              coverage: 28.45
            }
          },
          "3300000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1300000,
              coverage: 29.5
            }
          },
          "3350000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1350000,
              coverage: 30.55
            }
          },
          "3400000": {
            tv: {
              amount: 1200000,
              coverage: 27.4
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3450000": {
            tv: {
              amount: 1250000,
              coverage: 28.45
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3500000": {
            tv: {
              amount: 1300000,
              coverage: 29.5
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3550000": {
            tv: {
              amount: 1350000,
              coverage: 30.55
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3600000": {
            tv: {
              amount: 1400000,
              coverage: 31.6
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3650000": {
            tv: {
              amount: 1450000,
              coverage: 32.425
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3700000": {
            tv: {
              amount: 1400000,
              coverage: 31.6
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1500000,
              coverage: 33.25
            }
          },
          "3750000": {
            tv: {
              amount: 1550000,
              coverage: 34.075
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1400000,
              coverage: 31.6
            }
          },
          "3800000": {
            tv: {
              amount: 1400000,
              coverage: 31.6
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "3850000": {
            tv: {
              amount: 1500000,
              coverage: 33.25
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1550000,
              coverage: 34.075
            }
          },
          "3900000": {
            tv: {
              amount: 1500000,
              coverage: 33.25
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "3950000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1550000,
              coverage: 34.075
            }
          },
          "4000000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 800000,
              coverage: 40.5
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4050000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 850000,
              coverage: 41.275
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4100000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 900000,
              coverage: 42.05
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4150000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 950000,
              coverage: 42.825
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4200000": {
            tv: {
              amount: 1600000,
              coverage: 34.9
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4250000": {
            tv: {
              amount: 1650000,
              coverage: 35.55
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4300000": {
            tv: {
              amount: 1700000,
              coverage: 36.2
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1600000,
              coverage: 34.9
            }
          },
          "4350000": {
            tv: {
              amount: 1650000,
              coverage: 35.55
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1700000,
              coverage: 36.2
            }
          },
          "4400000": {
            tv: {
              amount: 1700000,
              coverage: 36.2
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1700000,
              coverage: 36.2
            }
          },
          "4450000": {
            tv: {
              amount: 1650000,
              coverage: 35.55
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1800000,
              coverage: 37.5
            }
          },
          "4500000": {
            tv: {
              amount: 1700000,
              coverage: 36.2
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1800000,
              coverage: 37.5
            }
          },
          "4550000": {
            tv: {
              amount: 1750000,
              coverage: 36.85
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1800000,
              coverage: 37.5
            }
          },
          "4600000": {
            tv: {
              amount: 1800000,
              coverage: 37.5
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1800000,
              coverage: 37.5
            }
          },
          "4650000": {
            tv: {
              amount: 1800000,
              coverage: 37.5
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1850000,
              coverage: 38.025
            }
          },
          "4700000": {
            tv: {
              amount: 1850000,
              coverage: 38.025
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1850000,
              coverage: 38.025
            }
          },
          "4750000": {
            tv: {
              amount: 1900000,
              coverage: 38.55
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1850000,
              coverage: 38.025
            }
          },
          "4800000": {
            tv: {
              amount: 1950000,
              coverage: 39.075
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1850000,
              coverage: 38.025
            }
          },
          "4850000": {
            tv: {
              amount: 1900000,
              coverage: 38.55
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1950000,
              coverage: 39.075
            }
          },
          "4900000": {
            tv: {
              amount: 1950000,
              coverage: 39.075
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 1950000,
              coverage: 39.075
            }
          },
          "4950000": {
            tv: {
              amount: 1950000,
              coverage: 39.075
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5000000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1000000,
              coverage: 43.6
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5050000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1050000,
              coverage: 44.05
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5100000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1100000,
              coverage: 44.5
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5150000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1150000,
              coverage: 44.95
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5200000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2000000,
              coverage: 39.6
            }
          },
          "5250000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2050000,
              coverage: 40
            }
          },
          "5300000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2100000,
              coverage: 40.4
            }
          },
          "5350000": {
            tv: {
              amount: 2050000,
              coverage: 40
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2100000,
              coverage: 40.4
            }
          },
          "5400000": {
            tv: {
              amount: 2000000,
              coverage: 39.6
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5450000": {
            tv: {
              amount: 2050000,
              coverage: 40
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5500000": {
            tv: {
              amount: 2100000,
              coverage: 40.4
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5550000": {
            tv: {
              amount: 2150000,
              coverage: 40.8
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5600000": {
            tv: {
              amount: 2200000,
              coverage: 41.2
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5650000": {
            tv: {
              amount: 2200000,
              coverage: 41.2
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2250000,
              coverage: 41.55
            }
          },
          "5700000": {
            tv: {
              amount: 2200000,
              coverage: 41.2
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2300000,
              coverage: 41.9
            }
          },
          "5750000": {
            tv: {
              amount: 2350000,
              coverage: 42.25
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2200000,
              coverage: 41.2
            }
          },
          "5800000": {
            tv: {
              amount: 2200000,
              coverage: 41.2
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "5850000": {
            tv: {
              amount: 2300000,
              coverage: 41.9
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2350000,
              coverage: 42.25
            }
          },
          "5900000": {
            tv: {
              amount: 2300000,
              coverage: 41.9
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "5950000": {
            tv: {
              amount: 2350000,
              coverage: 42.25
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6000000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1200000,
              coverage: 45.4
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6050000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1250000,
              coverage: 45.7
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6100000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1300000,
              coverage: 46
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6150000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1350000,
              coverage: 46.3
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6200000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2400000,
              coverage: 42.6
            }
          },
          "6250000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2450000,
              coverage: 42.85
            }
          },
          "6300000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2500000,
              coverage: 43.1
            }
          },
          "6350000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2550000,
              coverage: 43.35
            }
          },
          "6400000": {
            tv: {
              amount: 2400000,
              coverage: 42.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2600000,
              coverage: 43.6
            }
          },
          "6450000": {
            tv: {
              amount: 2450000,
              coverage: 42.85
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2600000,
              coverage: 43.6
            }
          },
          "6500000": {
            tv: {
              amount: 2500000,
              coverage: 43.1
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2600000,
              coverage: 43.6
            }
          },
          "6550000": {
            tv: {
              amount: 2550000,
              coverage: 43.35
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2600000,
              coverage: 43.6
            }
          },
          "6600000": {
            tv: {
              amount: 2600000,
              coverage: 43.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2600000,
              coverage: 43.6
            }
          },
          "6650000": {
            tv: {
              amount: 2600000,
              coverage: 43.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2650000,
              coverage: 43.825
            }
          },
          "6700000": {
            tv: {
              amount: 2600000,
              coverage: 43.6
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2700000,
              coverage: 44.05
            }
          },
          "6750000": {
            tv: {
              amount: 2650000,
              coverage: 43.825
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2700000,
              coverage: 44.05
            }
          },
          "6800000": {
            tv: {
              amount: 2650000,
              coverage: 43.825
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2750000,
              coverage: 44.275
            }
          },
          "6850000": {
            tv: {
              amount: 2650000,
              coverage: 43.825
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "6900000": {
            tv: {
              amount: 2700000,
              coverage: 44.05
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "6950000": {
            tv: {
              amount: 2750000,
              coverage: 44.275
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7000000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1400000,
              coverage: 46.6
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7050000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1450000,
              coverage: 46.8
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7100000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1500000,
              coverage: 47
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7150000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1550000,
              coverage: 47.2
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7200000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1600000,
              coverage: 47.4
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7250000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1650000,
              coverage: 47.525
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7300000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1700000,
              coverage: 47.65
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7350000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1750000,
              coverage: 47.775
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7400000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1800000,
              coverage: 47.9
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7450000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1850000,
              coverage: 48
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7500000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1900000,
              coverage: 48.1
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7550000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 1950000,
              coverage: 48.2
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7600000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2000000,
              coverage: 48.3
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7650000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2050000,
              coverage: 48.375
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7700000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2100000,
              coverage: 48.45
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7750000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2150000,
              coverage: 48.525
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2200000,
              coverage: 48.6
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2250000,
              coverage: 48.65
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2300000,
              coverage: 48.7
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2350000,
              coverage: 48.75
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2400000,
              coverage: 48.8
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2450000,
              coverage: 48.85
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2500000,
              coverage: 48.9
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2550000,
              coverage: 48.95
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2600000,
              coverage: 49
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2650000,
              coverage: 49.05
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2700000,
              coverage: 49.1
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2750000,
              coverage: 49.15
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 44.5
            },
            internet: {
              amount: 2800000,
              coverage: 49.2
            },
            magazines: {
              amount: 2800000,
              coverage: 44.5
            }
          }
        },
        kids: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 0.475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 0.95
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 1.425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 1.9
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 2.67
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 3.44
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 4.21
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 5.485
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 5.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 6.495
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 600000,
              coverage: 7.14
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 650000,
              coverage: 8.225
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 700000,
              coverage: 9.31
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 750000,
              coverage: 10.395
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 800000,
              coverage: 11.48
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 850000,
              coverage: 12.5125
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 900000,
              coverage: 13.545
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 950000,
              coverage: 14.5775
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 1000000,
              coverage: 15.61
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 1050000,
              coverage: 16.5025
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1100000": {
            tv: {
              amount: 1100000,
              coverage: 17.395
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1150000": {
            tv: {
              amount: 1150000,
              coverage: 18.2875
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1200000": {
            tv: {
              amount: 1200000,
              coverage: 19.18
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1250000": {
            tv: {
              amount: 1250000,
              coverage: 19.915
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1300000": {
            tv: {
              amount: 1300000,
              coverage: 20.65
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1350000": {
            tv: {
              amount: 1350000,
              coverage: 21.385
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1400000": {
            tv: {
              amount: 1400000,
              coverage: 22.12
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1450000": {
            tv: {
              amount: 1450000,
              coverage: 22.6975
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1500000": {
            tv: {
              amount: 1500000,
              coverage: 23.275
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1550000": {
            tv: {
              amount: 1550000,
              coverage: 23.8525
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1600000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1650000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 50000,
              coverage: 0.475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1700000": {
            tv: {
              amount: 1300000,
              coverage: 20.65
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1750000": {
            tv: {
              amount: 1350000,
              coverage: 21.385
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1800000": {
            tv: {
              amount: 1400000,
              coverage: 22.12
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1850000": {
            tv: {
              amount: 1450000,
              coverage: 22.6975
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1900000": {
            tv: {
              amount: 1500000,
              coverage: 23.275
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1950000": {
            tv: {
              amount: 1550000,
              coverage: 23.8525
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2000000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2050000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 450000,
              coverage: 5.485
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2100000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 500000,
              coverage: 5.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2150000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 550000,
              coverage: 6.495
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2200000": {
            tv: {
              amount: 1600000,
              coverage: 24.43
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2250000": {
            tv: {
              amount: 1650000,
              coverage: 24.885
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2300000": {
            tv: {
              amount: 1700000,
              coverage: 25.34
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2350000": {
            tv: {
              amount: 1750000,
              coverage: 25.795
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2400000": {
            tv: {
              amount: 1800000,
              coverage: 26.25
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2450000": {
            tv: {
              amount: 1850000,
              coverage: 26.6175
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2500000": {
            tv: {
              amount: 1900000,
              coverage: 26.985
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2550000": {
            tv: {
              amount: 1950000,
              coverage: 27.3525
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2600000": {
            tv: {
              amount: 2000000,
              coverage: 27.72
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2650000": {
            tv: {
              amount: 2050000,
              coverage: 28
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2700000": {
            tv: {
              amount: 2100000,
              coverage: 28.28
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2750000": {
            tv: {
              amount: 2150000,
              coverage: 28.56
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2800000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2850000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 650000,
              coverage: 7.275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2900000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 700000,
              coverage: 7.55
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2950000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 750000,
              coverage: 7.825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3000000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3050000": {
            tv: {
              amount: 2250000,
              coverage: 29.085
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3100000": {
            tv: {
              amount: 2300000,
              coverage: 29.33
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3150000": {
            tv: {
              amount: 2350000,
              coverage: 29.575
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3200000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3250000": {
            tv: {
              amount: 2450000,
              coverage: 29.995
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3300000": {
            tv: {
              amount: 2500000,
              coverage: 30.17
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3350000": {
            tv: {
              amount: 2550000,
              coverage: 30.345
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3400000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3450000": {
            tv: {
              amount: 2650000,
              coverage: 30.6775
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3500000": {
            tv: {
              amount: 2700000,
              coverage: 30.835
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3550000": {
            tv: {
              amount: 2750000,
              coverage: 30.9925
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3600000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3650000": {
            tv: {
              amount: 2050000,
              coverage: 28
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3700000": {
            tv: {
              amount: 2100000,
              coverage: 28.28
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3750000": {
            tv: {
              amount: 2150000,
              coverage: 28.56
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3800000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3850000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 650000,
              coverage: 7.275
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3900000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 700000,
              coverage: 7.55
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3950000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 750000,
              coverage: 7.825
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "4000000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "4050000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1050000,
              coverage: 4.715
            }
          },
          "4100000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1100000,
              coverage: 4.97
            }
          },
          "4150000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1150000,
              coverage: 5.225
            }
          },
          "4200000": {
            tv: {
              amount: 2200000,
              coverage: 28.84
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4250000": {
            tv: {
              amount: 2250000,
              coverage: 29.085
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4300000": {
            tv: {
              amount: 2300000,
              coverage: 29.33
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4350000": {
            tv: {
              amount: 2350000,
              coverage: 29.575
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4400000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4450000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1250000,
              coverage: 5.69
            }
          },
          "4500000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1300000,
              coverage: 5.9
            }
          },
          "4550000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1350000,
              coverage: 6.11
            }
          },
          "4600000": {
            tv: {
              amount: 2400000,
              coverage: 29.82
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4650000": {
            tv: {
              amount: 2450000,
              coverage: 29.995
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4700000": {
            tv: {
              amount: 2500000,
              coverage: 30.17
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4750000": {
            tv: {
              amount: 2550000,
              coverage: 30.345
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4800000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4850000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1450000,
              coverage: 6.485
            }
          },
          "4900000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1500000,
              coverage: 6.65
            }
          },
          "4950000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1550000,
              coverage: 6.815
            }
          },
          "5000000": {
            tv: {
              amount: 2600000,
              coverage: 30.52
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5050000": {
            tv: {
              amount: 2650000,
              coverage: 30.6775
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5100000": {
            tv: {
              amount: 2700000,
              coverage: 30.835
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5150000": {
            tv: {
              amount: 2750000,
              coverage: 30.9925
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5200000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5250000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 850000,
              coverage: 8.255
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5300000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 900000,
              coverage: 8.41
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5350000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 950000,
              coverage: 8.565
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5400000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5450000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1650000,
              coverage: 7.11
            }
          },
          "5500000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1700000,
              coverage: 7.24
            }
          },
          "5550000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1750000,
              coverage: 7.37
            }
          },
          "5600000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1800000,
              coverage: 7.5
            }
          },
          "5650000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1850000,
              coverage: 7.605
            }
          },
          "5700000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1900000,
              coverage: 7.71
            }
          },
          "5750000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1950000,
              coverage: 7.815
            }
          },
          "5800000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "5850000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1050000,
              coverage: 8.81
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "5900000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1100000,
              coverage: 8.9
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "5950000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1150000,
              coverage: 8.99
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6000000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6050000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2050000,
              coverage: 8
            }
          },
          "6100000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2100000,
              coverage: 8.08
            }
          },
          "6150000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2150000,
              coverage: 8.16
            }
          },
          "6200000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2200000,
              coverage: 8.24
            }
          },
          "6250000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2250000,
              coverage: 8.31
            }
          },
          "6300000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2300000,
              coverage: 8.38
            }
          },
          "6350000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2350000,
              coverage: 8.45
            }
          },
          "6400000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6450000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1250000,
              coverage: 9.14
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6500000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1300000,
              coverage: 9.2
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6550000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1350000,
              coverage: 9.26
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6600000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6650000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2450000,
              coverage: 8.57
            }
          },
          "6700000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2500000,
              coverage: 8.62
            }
          },
          "6750000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2550000,
              coverage: 8.67
            }
          },
          "6800000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2600000,
              coverage: 8.72
            }
          },
          "6850000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2650000,
              coverage: 8.765
            }
          },
          "6900000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2700000,
              coverage: 8.81
            }
          },
          "6950000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2750000,
              coverage: 8.855
            }
          },
          "7000000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7050000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1450000,
              coverage: 9.36
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7100000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1500000,
              coverage: 9.4
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7150000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1550000,
              coverage: 9.44
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7200000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7250000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1650000,
              coverage: 9.505
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7300000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1700000,
              coverage: 9.53
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7350000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1750000,
              coverage: 9.555
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7400000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7450000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1850000,
              coverage: 9.6
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7500000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1900000,
              coverage: 9.62
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7550000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 1950000,
              coverage: 9.64
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7600000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2000000,
              coverage: 9.66
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7650000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2050000,
              coverage: 9.675
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7700000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2100000,
              coverage: 9.69
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7750000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2150000,
              coverage: 9.705
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2200000,
              coverage: 9.72
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2250000,
              coverage: 9.73
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2300000,
              coverage: 9.74
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2350000,
              coverage: 9.75
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2400000,
              coverage: 9.76
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2450000,
              coverage: 9.77
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2500000,
              coverage: 9.78
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2550000,
              coverage: 9.79
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2600000,
              coverage: 9.8
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2650000,
              coverage: 9.81
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2700000,
              coverage: 9.82
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2750000,
              coverage: 9.83
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 31.15
            },
            internet: {
              amount: 2800000,
              coverage: 9.84
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          }
        },
        racers: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 0.95
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 1.9
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 2.85
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 3.8
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 5.34
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 6.88
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 8.42
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 9.96
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 10.97
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 11.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 12.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 14.55
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 15.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 15.65
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 16.51
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 16.82
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 950000,
              coverage: 17.13
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 450000,
              coverage: 3.645
            }
          },
          "1100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 500000,
              coverage: 4.47
            }
          },
          "1150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 550000,
              coverage: 5.295
            }
          },
          "1200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 600000,
              coverage: 6.12
            }
          },
          "1250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 650000,
              coverage: 7.05
            }
          },
          "1300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 700000,
              coverage: 7.98
            }
          },
          "1350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 750000,
              coverage: 8.91
            }
          },
          "1400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 800000,
              coverage: 9.84
            }
          },
          "1450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 850000,
              coverage: 10.725
            }
          },
          "1500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 900000,
              coverage: 11.61
            }
          },
          "1550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 950000,
              coverage: 12.495
            }
          },
          "1600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1000000,
              coverage: 13.38
            }
          },
          "1650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1050000,
              coverage: 14.145
            }
          },
          "1700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1100000,
              coverage: 14.91
            }
          },
          "1750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1150000,
              coverage: 15.675
            }
          },
          "1800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1200000,
              coverage: 16.44
            }
          },
          "1850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1250000,
              coverage: 17.07
            }
          },
          "1900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1300000,
              coverage: 17.7
            }
          },
          "1950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1350000,
              coverage: 18.33
            }
          },
          "2000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 14
            },
            magazines: {
              amount: 1400000,
              coverage: 18.96
            }
          },
          "2050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 14.55
            },
            magazines: {
              amount: 1400000,
              coverage: 18.96
            }
          },
          "2100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 15.1
            },
            magazines: {
              amount: 1400000,
              coverage: 18.96
            }
          },
          "2150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 15.65
            },
            magazines: {
              amount: 1400000,
              coverage: 18.96
            }
          },
          "2200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1400000,
              coverage: 18.96
            }
          },
          "2250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1450000,
              coverage: 19.455
            }
          },
          "2300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1500000,
              coverage: 19.95
            }
          },
          "2350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1550000,
              coverage: 20.445
            }
          },
          "2400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1600000,
              coverage: 20.94
            }
          },
          "2450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1650000,
              coverage: 21.33
            }
          },
          "2500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1700000,
              coverage: 21.72
            }
          },
          "2550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1750000,
              coverage: 22.11
            }
          },
          "2600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1800000,
              coverage: 22.5
            }
          },
          "2650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1850000,
              coverage: 22.815
            }
          },
          "2700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1900000,
              coverage: 23.13
            }
          },
          "2750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 1950000,
              coverage: 23.445
            }
          },
          "2800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 16.2
            },
            magazines: {
              amount: 2000000,
              coverage: 23.76
            }
          },
          "2850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 16.51
            },
            magazines: {
              amount: 2000000,
              coverage: 23.76
            }
          },
          "2900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 16.82
            },
            magazines: {
              amount: 2000000,
              coverage: 23.76
            }
          },
          "2950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 950000,
              coverage: 17.13
            },
            magazines: {
              amount: 2000000,
              coverage: 23.76
            }
          },
          "3000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2000000,
              coverage: 23.76
            }
          },
          "3050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2050000,
              coverage: 24
            }
          },
          "3100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2100000,
              coverage: 24.24
            }
          },
          "3150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2150000,
              coverage: 24.48
            }
          },
          "3200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2200000,
              coverage: 24.72
            }
          },
          "3250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2250000,
              coverage: 24.93
            }
          },
          "3300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2300000,
              coverage: 25.14
            }
          },
          "3350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2350000,
              coverage: 25.35
            }
          },
          "3400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 17.44
            },
            magazines: {
              amount: 2400000,
              coverage: 25.56
            }
          },
          "3450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1050000,
              coverage: 17.62
            },
            magazines: {
              amount: 2400000,
              coverage: 25.56
            }
          },
          "3500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1100000,
              coverage: 17.8
            },
            magazines: {
              amount: 2400000,
              coverage: 25.56
            }
          },
          "3550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1150000,
              coverage: 17.98
            },
            magazines: {
              amount: 2400000,
              coverage: 25.56
            }
          },
          "3600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2400000,
              coverage: 25.56
            }
          },
          "3650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2450000,
              coverage: 25.71
            }
          },
          "3700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2500000,
              coverage: 25.86
            }
          },
          "3750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2550000,
              coverage: 26.01
            }
          },
          "3800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "3850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2650000,
              coverage: 26.295
            }
          },
          "3900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2700000,
              coverage: 26.43
            }
          },
          "3950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2750000,
              coverage: 26.565
            }
          },
          "4000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1250000,
              coverage: 18.28
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1300000,
              coverage: 18.4
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1350000,
              coverage: 18.52
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1450000,
              coverage: 18.72
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1500000,
              coverage: 18.8
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1550000,
              coverage: 18.88
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1650000,
              coverage: 19.01
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1700000,
              coverage: 19.06
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1750000,
              coverage: 19.11
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "4600000": {
            tv: {
              amount: 800000,
              coverage: 1.64
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "4650000": {
            tv: {
              amount: 850000,
              coverage: 1.7875
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "4700000": {
            tv: {
              amount: 900000,
              coverage: 1.935
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "4750000": {
            tv: {
              amount: 950000,
              coverage: 2.0825
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "4800000": {
            tv: {
              amount: 1000000,
              coverage: 2.23
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2600000,
              coverage: 26.16
            }
          },
          "4850000": {
            tv: {
              amount: 1000000,
              coverage: 2.23
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2650000,
              coverage: 26.295
            }
          },
          "4900000": {
            tv: {
              amount: 1000000,
              coverage: 2.23
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2700000,
              coverage: 26.43
            }
          },
          "4950000": {
            tv: {
              amount: 1000000,
              coverage: 2.23
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2750000,
              coverage: 26.565
            }
          },
          "5000000": {
            tv: {
              amount: 1000000,
              coverage: 2.23
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5050000": {
            tv: {
              amount: 1050000,
              coverage: 2.3575
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5100000": {
            tv: {
              amount: 1100000,
              coverage: 2.485
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5150000": {
            tv: {
              amount: 1150000,
              coverage: 2.6125
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5200000": {
            tv: {
              amount: 1200000,
              coverage: 2.74
            },
            internet: {
              amount: 1200000,
              coverage: 18.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5250000": {
            tv: {
              amount: 1200000,
              coverage: 2.74
            },
            internet: {
              amount: 1250000,
              coverage: 18.28
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5300000": {
            tv: {
              amount: 1200000,
              coverage: 2.74
            },
            internet: {
              amount: 1300000,
              coverage: 18.4
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5350000": {
            tv: {
              amount: 1200000,
              coverage: 2.74
            },
            internet: {
              amount: 1350000,
              coverage: 18.52
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5400000": {
            tv: {
              amount: 1200000,
              coverage: 2.74
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5450000": {
            tv: {
              amount: 1250000,
              coverage: 2.845
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5500000": {
            tv: {
              amount: 1300000,
              coverage: 2.95
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5550000": {
            tv: {
              amount: 1350000,
              coverage: 3.055
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5600000": {
            tv: {
              amount: 1400000,
              coverage: 3.16
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5650000": {
            tv: {
              amount: 1450000,
              coverage: 3.2425
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5700000": {
            tv: {
              amount: 1500000,
              coverage: 3.325
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5750000": {
            tv: {
              amount: 1550000,
              coverage: 3.4075
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5800000": {
            tv: {
              amount: 1600000,
              coverage: 3.49
            },
            internet: {
              amount: 1400000,
              coverage: 18.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5850000": {
            tv: {
              amount: 1600000,
              coverage: 3.49
            },
            internet: {
              amount: 1450000,
              coverage: 18.72
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5900000": {
            tv: {
              amount: 1600000,
              coverage: 3.49
            },
            internet: {
              amount: 1500000,
              coverage: 18.8
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "5950000": {
            tv: {
              amount: 1600000,
              coverage: 3.49
            },
            internet: {
              amount: 1550000,
              coverage: 18.88
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6000000": {
            tv: {
              amount: 1600000,
              coverage: 3.49
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6050000": {
            tv: {
              amount: 1650000,
              coverage: 3.555
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6100000": {
            tv: {
              amount: 1700000,
              coverage: 3.62
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6150000": {
            tv: {
              amount: 1750000,
              coverage: 3.685
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6200000": {
            tv: {
              amount: 1800000,
              coverage: 3.75
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6250000": {
            tv: {
              amount: 1850000,
              coverage: 3.8025
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6300000": {
            tv: {
              amount: 1900000,
              coverage: 3.855
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6350000": {
            tv: {
              amount: 1950000,
              coverage: 3.9075
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6400000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1600000,
              coverage: 18.96
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6450000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1650000,
              coverage: 19.01
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6500000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1700000,
              coverage: 19.06
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6550000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1750000,
              coverage: 19.11
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6600000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1800000,
              coverage: 19.16
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6650000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1850000,
              coverage: 19.2
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6700000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1900000,
              coverage: 19.24
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6750000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 1950000,
              coverage: 19.28
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6800000": {
            tv: {
              amount: 2000000,
              coverage: 3.96
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6850000": {
            tv: {
              amount: 2050000,
              coverage: 4
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6900000": {
            tv: {
              amount: 2100000,
              coverage: 4.04
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "6950000": {
            tv: {
              amount: 2200000,
              coverage: 4.12
            },
            internet: {
              amount: 1950000,
              coverage: 19.28
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7000000": {
            tv: {
              amount: 2200000,
              coverage: 4.12
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7050000": {
            tv: {
              amount: 2250000,
              coverage: 4.155
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7100000": {
            tv: {
              amount: 2300000,
              coverage: 4.19
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7150000": {
            tv: {
              amount: 2350000,
              coverage: 4.225
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7200000": {
            tv: {
              amount: 2400000,
              coverage: 4.26
            },
            internet: {
              amount: 2000000,
              coverage: 19.32
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7250000": {
            tv: {
              amount: 2400000,
              coverage: 4.26
            },
            internet: {
              amount: 2050000,
              coverage: 19.35
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7300000": {
            tv: {
              amount: 2400000,
              coverage: 4.26
            },
            internet: {
              amount: 2100000,
              coverage: 19.38
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7350000": {
            tv: {
              amount: 2400000,
              coverage: 4.26
            },
            internet: {
              amount: 2150000,
              coverage: 19.41
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7400000": {
            tv: {
              amount: 2400000,
              coverage: 4.26
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7450000": {
            tv: {
              amount: 2450000,
              coverage: 4.285
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7500000": {
            tv: {
              amount: 2500000,
              coverage: 4.31
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7550000": {
            tv: {
              amount: 2550000,
              coverage: 4.335
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7600000": {
            tv: {
              amount: 2600000,
              coverage: 4.36
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7650000": {
            tv: {
              amount: 2650000,
              coverage: 4.3825
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7700000": {
            tv: {
              amount: 2700000,
              coverage: 4.405
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7750000": {
            tv: {
              amount: 2750000,
              coverage: 4.4275
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2200000,
              coverage: 19.44
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2250000,
              coverage: 19.46
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2300000,
              coverage: 19.48
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2350000,
              coverage: 19.5
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2400000,
              coverage: 19.52
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2450000,
              coverage: 19.54
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2500000,
              coverage: 19.56
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2550000,
              coverage: 19.58
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2600000,
              coverage: 19.6
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2650000,
              coverage: 19.62
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2700000,
              coverage: 19.64
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2750000,
              coverage: 19.66
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 4.45
            },
            internet: {
              amount: 2800000,
              coverage: 19.68
            },
            magazines: {
              amount: 2800000,
              coverage: 26.7
            }
          }
        },
        commuters: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 0.475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 0.95
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 1.425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 1.9
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 2.67
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 3.44
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 4.21
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 5.485
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 5.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 6.495
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 7.275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 7.55
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 7.825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 800000,
              coverage: 8.2
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 850000,
              coverage: 8.9375
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 900000,
              coverage: 9.675
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 950000,
              coverage: 10.4125
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 1000000,
              coverage: 11.15
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 1050000,
              coverage: 11.7875
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1100000": {
            tv: {
              amount: 1100000,
              coverage: 12.425
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1150000": {
            tv: {
              amount: 1150000,
              coverage: 13.0625
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1200000": {
            tv: {
              amount: 1200000,
              coverage: 13.7
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1250000": {
            tv: {
              amount: 1250000,
              coverage: 14.225
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1300000": {
            tv: {
              amount: 1300000,
              coverage: 14.75
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1350000": {
            tv: {
              amount: 950000,
              coverage: 10.4125
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1400000": {
            tv: {
              amount: 1000000,
              coverage: 11.15
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1450000": {
            tv: {
              amount: 1050000,
              coverage: 11.7875
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1500000": {
            tv: {
              amount: 1100000,
              coverage: 12.425
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1550000": {
            tv: {
              amount: 1150000,
              coverage: 13.0625
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1600000": {
            tv: {
              amount: 1200000,
              coverage: 13.7
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1650000": {
            tv: {
              amount: 1250000,
              coverage: 14.225
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1700000": {
            tv: {
              amount: 1300000,
              coverage: 14.75
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1750000": {
            tv: {
              amount: 1350000,
              coverage: 15.275
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1800000": {
            tv: {
              amount: 1400000,
              coverage: 15.8
            },
            internet: {
              amount: 400000,
              coverage: 4.98
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1850000": {
            tv: {
              amount: 1400000,
              coverage: 15.8
            },
            internet: {
              amount: 450000,
              coverage: 5.485
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1900000": {
            tv: {
              amount: 1400000,
              coverage: 15.8
            },
            internet: {
              amount: 500000,
              coverage: 5.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1950000": {
            tv: {
              amount: 1400000,
              coverage: 15.8
            },
            internet: {
              amount: 550000,
              coverage: 6.495
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2000000": {
            tv: {
              amount: 1400000,
              coverage: 15.8
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2050000": {
            tv: {
              amount: 1450000,
              coverage: 16.2125
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2100000": {
            tv: {
              amount: 1500000,
              coverage: 16.625
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2150000": {
            tv: {
              amount: 1550000,
              coverage: 17.0375
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2200000": {
            tv: {
              amount: 1600000,
              coverage: 17.45
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2250000": {
            tv: {
              amount: 1650000,
              coverage: 17.775
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2300000": {
            tv: {
              amount: 1700000,
              coverage: 18.1
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2350000": {
            tv: {
              amount: 1750000,
              coverage: 18.425
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2400000": {
            tv: {
              amount: 1800000,
              coverage: 18.75
            },
            internet: {
              amount: 600000,
              coverage: 7
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2450000": {
            tv: {
              amount: 1800000,
              coverage: 18.75
            },
            internet: {
              amount: 650000,
              coverage: 7.275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2500000": {
            tv: {
              amount: 1800000,
              coverage: 18.75
            },
            internet: {
              amount: 700000,
              coverage: 7.55
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2550000": {
            tv: {
              amount: 1800000,
              coverage: 18.75
            },
            internet: {
              amount: 750000,
              coverage: 7.825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2600000": {
            tv: {
              amount: 1800000,
              coverage: 18.75
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2650000": {
            tv: {
              amount: 1850000,
              coverage: 19.0125
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2700000": {
            tv: {
              amount: 1900000,
              coverage: 19.275
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2750000": {
            tv: {
              amount: 1950000,
              coverage: 19.5375
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2800000": {
            tv: {
              amount: 2000000,
              coverage: 19.8
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2850000": {
            tv: {
              amount: 2050000,
              coverage: 20
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2900000": {
            tv: {
              amount: 2100000,
              coverage: 20.2
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2950000": {
            tv: {
              amount: 2150000,
              coverage: 20.4
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3000000": {
            tv: {
              amount: 2200000,
              coverage: 20.6
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3050000": {
            tv: {
              amount: 2250000,
              coverage: 20.775
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3100000": {
            tv: {
              amount: 2300000,
              coverage: 20.95
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3150000": {
            tv: {
              amount: 2350000,
              coverage: 21.125
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3200000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 800000,
              coverage: 8.1
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3250000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 850000,
              coverage: 8.255
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3300000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 900000,
              coverage: 8.41
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3350000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 950000,
              coverage: 8.565
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3400000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3450000": {
            tv: {
              amount: 2450000,
              coverage: 21.425
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3500000": {
            tv: {
              amount: 2500000,
              coverage: 21.55
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3550000": {
            tv: {
              amount: 2550000,
              coverage: 21.675
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3600000": {
            tv: {
              amount: 2600000,
              coverage: 21.8
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3650000": {
            tv: {
              amount: 2650000,
              coverage: 21.9125
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3700000": {
            tv: {
              amount: 2700000,
              coverage: 22.025
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3750000": {
            tv: {
              amount: 2750000,
              coverage: 22.1375
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3800000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3850000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1050000,
              coverage: 8.81
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3900000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1100000,
              coverage: 8.9
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3950000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1150000,
              coverage: 8.99
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "4000000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "4050000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1250000,
              coverage: 9.14
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "4100000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1300000,
              coverage: 9.2
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "4150000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1350000,
              coverage: 9.26
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "4200000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 800000,
              coverage: 1.64
            }
          },
          "4250000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 850000,
              coverage: 1.7875
            }
          },
          "4300000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 900000,
              coverage: 1.935
            }
          },
          "4350000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 950000,
              coverage: 2.0825
            }
          },
          "4400000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1000000,
              coverage: 2.23
            }
          },
          "4450000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1050000,
              coverage: 2.3575
            }
          },
          "4500000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1100000,
              coverage: 2.485
            }
          },
          "4550000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1150000,
              coverage: 2.6125
            }
          },
          "4600000": {
            tv: {
              amount: 2400000,
              coverage: 21.3
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4650000": {
            tv: {
              amount: 2450000,
              coverage: 21.425
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4700000": {
            tv: {
              amount: 2500000,
              coverage: 21.55
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4750000": {
            tv: {
              amount: 2550000,
              coverage: 21.675
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4800000": {
            tv: {
              amount: 2600000,
              coverage: 21.8
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4850000": {
            tv: {
              amount: 2650000,
              coverage: 21.9125
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4900000": {
            tv: {
              amount: 2700000,
              coverage: 22.025
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "4950000": {
            tv: {
              amount: 2750000,
              coverage: 22.1375
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "5000000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1200000,
              coverage: 2.74
            }
          },
          "5050000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1250000,
              coverage: 2.845
            }
          },
          "5100000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1300000,
              coverage: 2.95
            }
          },
          "5150000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1350000,
              coverage: 3.055
            }
          },
          "5200000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1000000,
              coverage: 8.72
            },
            magazines: {
              amount: 1400000,
              coverage: 3.16
            }
          },
          "5250000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1050000,
              coverage: 8.81
            },
            magazines: {
              amount: 1400000,
              coverage: 3.16
            }
          },
          "5300000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1100000,
              coverage: 8.9
            },
            magazines: {
              amount: 1400000,
              coverage: 3.16
            }
          },
          "5350000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1150000,
              coverage: 8.99
            },
            magazines: {
              amount: 1400000,
              coverage: 3.16
            }
          },
          "5400000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1400000,
              coverage: 3.16
            }
          },
          "5450000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1450000,
              coverage: 3.2425
            }
          },
          "5500000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1500000,
              coverage: 3.325
            }
          },
          "5550000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1550000,
              coverage: 3.4075
            }
          },
          "5600000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1600000,
              coverage: 3.49
            }
          },
          "5650000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1650000,
              coverage: 3.555
            }
          },
          "5700000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1700000,
              coverage: 3.62
            }
          },
          "5750000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1750000,
              coverage: 3.685
            }
          },
          "5800000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1200000,
              coverage: 9.08
            },
            magazines: {
              amount: 1800000,
              coverage: 3.75
            }
          },
          "5850000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1250000,
              coverage: 9.14
            },
            magazines: {
              amount: 1800000,
              coverage: 3.75
            }
          },
          "5900000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1300000,
              coverage: 9.2
            },
            magazines: {
              amount: 1800000,
              coverage: 3.75
            }
          },
          "5950000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1350000,
              coverage: 9.26
            },
            magazines: {
              amount: 1800000,
              coverage: 3.75
            }
          },
          "6000000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 1800000,
              coverage: 3.75
            }
          },
          "6050000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 1850000,
              coverage: 3.8025
            }
          },
          "6100000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 1900000,
              coverage: 3.855
            }
          },
          "6150000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 1950000,
              coverage: 3.9075
            }
          },
          "6200000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2000000,
              coverage: 3.96
            }
          },
          "6250000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2050000,
              coverage: 4
            }
          },
          "6300000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2100000,
              coverage: 4.04
            }
          },
          "6350000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2150000,
              coverage: 4.08
            }
          },
          "6400000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1400000,
              coverage: 9.32
            },
            magazines: {
              amount: 2200000,
              coverage: 4.12
            }
          },
          "6450000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2050000,
              coverage: 4
            }
          },
          "6500000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2100000,
              coverage: 4.04
            }
          },
          "6550000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2150000,
              coverage: 4.08
            }
          },
          "6600000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2200000,
              coverage: 4.12
            }
          },
          "6650000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2250000,
              coverage: 4.155
            }
          },
          "6700000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2300000,
              coverage: 4.19
            }
          },
          "6750000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2350000,
              coverage: 4.225
            }
          },
          "6800000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2400000,
              coverage: 4.26
            }
          },
          "6850000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2450000,
              coverage: 4.285
            }
          },
          "6900000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1650000,
              coverage: 9.505
            },
            magazines: {
              amount: 2450000,
              coverage: 4.285
            }
          },
          "6950000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1650000,
              coverage: 9.505
            },
            magazines: {
              amount: 2500000,
              coverage: 4.31
            }
          },
          "7000000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1600000,
              coverage: 9.48
            },
            magazines: {
              amount: 2600000,
              coverage: 4.36
            }
          },
          "7050000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1650000,
              coverage: 9.505
            },
            magazines: {
              amount: 2600000,
              coverage: 4.36
            }
          },
          "7100000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1700000,
              coverage: 9.53
            },
            magazines: {
              amount: 2600000,
              coverage: 4.36
            }
          },
          "7150000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1750000,
              coverage: 9.555
            },
            magazines: {
              amount: 2600000,
              coverage: 4.36
            }
          },
          "7200000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2600000,
              coverage: 4.36
            }
          },
          "7250000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2650000,
              coverage: 4.3825
            }
          },
          "7300000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2700000,
              coverage: 4.405
            }
          },
          "7350000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2750000,
              coverage: 4.4275
            }
          },
          "7400000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1800000,
              coverage: 9.58
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7450000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1850000,
              coverage: 9.6
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7500000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1900000,
              coverage: 9.62
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7550000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 1950000,
              coverage: 9.64
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7600000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2000000,
              coverage: 9.66
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7650000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2050000,
              coverage: 9.675
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7700000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2100000,
              coverage: 9.69
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7750000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2150000,
              coverage: 9.705
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2200000,
              coverage: 9.72
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2250000,
              coverage: 9.73
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2300000,
              coverage: 9.74
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2350000,
              coverage: 9.75
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2400000,
              coverage: 9.76
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2450000,
              coverage: 9.77
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2500000,
              coverage: 9.78
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2550000,
              coverage: 9.79
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2600000,
              coverage: 9.8
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2650000,
              coverage: 9.81
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2700000,
              coverage: 9.82
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2750000,
              coverage: 9.83
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 22.25
            },
            internet: {
              amount: 2800000,
              coverage: 9.84
            },
            magazines: {
              amount: 2800000,
              coverage: 4.45
            }
          }
        },
        leisure: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 0.7125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 1.425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 2.1375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 2.85
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 4.005
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 5.16
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 6.315
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 8.2275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 8.985
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 9.7425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 11.325
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 12.3825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 12.615
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 950000,
              coverage: 12.8475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 600000,
              coverage: 6.12
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 650000,
              coverage: 7.05
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1100000": {
            tv: {
              amount: 700000,
              coverage: 7.98
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1150000": {
            tv: {
              amount: 750000,
              coverage: 8.91
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1200000": {
            tv: {
              amount: 800000,
              coverage: 9.84
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1250000": {
            tv: {
              amount: 850000,
              coverage: 10.725
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1300000": {
            tv: {
              amount: 900000,
              coverage: 11.61
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1350000": {
            tv: {
              amount: 950000,
              coverage: 12.495
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1400000": {
            tv: {
              amount: 1000000,
              coverage: 13.38
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1450000": {
            tv: {
              amount: 1050000,
              coverage: 14.145
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1500000": {
            tv: {
              amount: 1100000,
              coverage: 14.91
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1550000": {
            tv: {
              amount: 1150000,
              coverage: 15.675
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1600000": {
            tv: {
              amount: 1200000,
              coverage: 16.44
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1650000": {
            tv: {
              amount: 1200000,
              coverage: 16.44
            },
            internet: {
              amount: 450000,
              coverage: 8.2275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1700000": {
            tv: {
              amount: 1200000,
              coverage: 16.44
            },
            internet: {
              amount: 500000,
              coverage: 8.985
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1750000": {
            tv: {
              amount: 1200000,
              coverage: 16.44
            },
            internet: {
              amount: 550000,
              coverage: 9.7425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1800000": {
            tv: {
              amount: 1200000,
              coverage: 16.44
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1850000": {
            tv: {
              amount: 1250000,
              coverage: 17.07
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1900000": {
            tv: {
              amount: 1300000,
              coverage: 17.7
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1950000": {
            tv: {
              amount: 1350000,
              coverage: 18.33
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2000000": {
            tv: {
              amount: 1400000,
              coverage: 18.96
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2050000": {
            tv: {
              amount: 1450000,
              coverage: 19.455
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2100000": {
            tv: {
              amount: 1500000,
              coverage: 19.95
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2150000": {
            tv: {
              amount: 1550000,
              coverage: 20.445
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2200000": {
            tv: {
              amount: 1600000,
              coverage: 20.94
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2250000": {
            tv: {
              amount: 1600000,
              coverage: 20.94
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2300000": {
            tv: {
              amount: 1600000,
              coverage: 20.94
            },
            internet: {
              amount: 700000,
              coverage: 11.325
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2350000": {
            tv: {
              amount: 1600000,
              coverage: 20.94
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2400000": {
            tv: {
              amount: 1600000,
              coverage: 20.94
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2450000": {
            tv: {
              amount: 1650000,
              coverage: 21.33
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2500000": {
            tv: {
              amount: 1700000,
              coverage: 21.72
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2550000": {
            tv: {
              amount: 1750000,
              coverage: 22.11
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2600000": {
            tv: {
              amount: 1800000,
              coverage: 22.5
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2650000": {
            tv: {
              amount: 1850000,
              coverage: 22.815
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2700000": {
            tv: {
              amount: 1900000,
              coverage: 23.13
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2750000": {
            tv: {
              amount: 1950000,
              coverage: 23.445
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2800000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2850000": {
            tv: {
              amount: 2050000,
              coverage: 24
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2900000": {
            tv: {
              amount: 2100000,
              coverage: 24.24
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "2950000": {
            tv: {
              amount: 2150000,
              coverage: 24.48
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3000000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3050000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 850000,
              coverage: 12.3825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3100000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 900000,
              coverage: 12.615
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3150000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 950000,
              coverage: 12.8475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3200000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3250000": {
            tv: {
              amount: 2250000,
              coverage: 24.93
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3300000": {
            tv: {
              amount: 2300000,
              coverage: 25.14
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3350000": {
            tv: {
              amount: 2350000,
              coverage: 25.35
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3400000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3450000": {
            tv: {
              amount: 2450000,
              coverage: 25.71
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3500000": {
            tv: {
              amount: 2500000,
              coverage: 25.86
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3550000": {
            tv: {
              amount: 2550000,
              coverage: 26.01
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3600000": {
            tv: {
              amount: 2600000,
              coverage: 26.16
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "3650000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 850000,
              coverage: 3.575
            }
          },
          "3700000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 900000,
              coverage: 3.87
            }
          },
          "3750000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 950000,
              coverage: 4.165
            }
          },
          "3800000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1000000,
              coverage: 4.46
            }
          },
          "3850000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1050000,
              coverage: 4.715
            }
          },
          "3900000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1100000,
              coverage: 4.97
            }
          },
          "3950000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1150000,
              coverage: 5.225
            }
          },
          "4000000": {
            tv: {
              amount: 2000000,
              coverage: 23.76
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4050000": {
            tv: {
              amount: 2050000,
              coverage: 24
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4100000": {
            tv: {
              amount: 2100000,
              coverage: 24.24
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4150000": {
            tv: {
              amount: 2150000,
              coverage: 24.48
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4200000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4250000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 850000,
              coverage: 12.3825
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4300000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 900000,
              coverage: 12.615
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4350000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 950000,
              coverage: 12.8475
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4400000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4450000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1250000,
              coverage: 5.69
            }
          },
          "4500000": {
            tv: {
              amount: 2300000,
              coverage: 25.14
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4550000": {
            tv: {
              amount: 2200000,
              coverage: 24.72
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1350000,
              coverage: 6.11
            }
          },
          "4600000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1200000,
              coverage: 5.48
            }
          },
          "4650000": {
            tv: {
              amount: 2250000,
              coverage: 24.93
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4700000": {
            tv: {
              amount: 2300000,
              coverage: 25.14
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4750000": {
            tv: {
              amount: 2350000,
              coverage: 25.35
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4800000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1400000,
              coverage: 6.32
            }
          },
          "4850000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1450000,
              coverage: 6.485
            }
          },
          "4900000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1500000,
              coverage: 6.65
            }
          },
          "4950000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1550000,
              coverage: 6.815
            }
          },
          "5000000": {
            tv: {
              amount: 2400000,
              coverage: 25.56
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5050000": {
            tv: {
              amount: 2450000,
              coverage: 25.71
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5100000": {
            tv: {
              amount: 2500000,
              coverage: 25.86
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5150000": {
            tv: {
              amount: 2550000,
              coverage: 26.01
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5200000": {
            tv: {
              amount: 2600000,
              coverage: 26.16
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5250000": {
            tv: {
              amount: 2600000,
              coverage: 26.16
            },
            internet: {
              amount: 1050000,
              coverage: 13.215
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5300000": {
            tv: {
              amount: 2650000,
              coverage: 26.295
            },
            internet: {
              amount: 1050000,
              coverage: 13.215
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5350000": {
            tv: {
              amount: 2600000,
              coverage: 26.16
            },
            internet: {
              amount: 1150000,
              coverage: 13.485
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5400000": {
            tv: {
              amount: 2600000,
              coverage: 26.16
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5450000": {
            tv: {
              amount: 2650000,
              coverage: 26.295
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5500000": {
            tv: {
              amount: 2700000,
              coverage: 26.43
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5550000": {
            tv: {
              amount: 2750000,
              coverage: 26.565
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5600000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1600000,
              coverage: 6.98
            }
          },
          "5650000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1650000,
              coverage: 7.11
            }
          },
          "5700000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1700000,
              coverage: 7.24
            }
          },
          "5750000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1750000,
              coverage: 7.37
            }
          },
          "5800000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1800000,
              coverage: 7.5
            }
          },
          "5850000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1850000,
              coverage: 7.605
            }
          },
          "5900000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1900000,
              coverage: 7.71
            }
          },
          "5950000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 1950000,
              coverage: 7.815
            }
          },
          "6000000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6050000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1250000,
              coverage: 13.71
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6100000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1300000,
              coverage: 13.8
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6150000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1350000,
              coverage: 13.89
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6200000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2000000,
              coverage: 7.92
            }
          },
          "6250000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2050000,
              coverage: 8
            }
          },
          "6300000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2100000,
              coverage: 8.08
            }
          },
          "6350000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2150000,
              coverage: 8.16
            }
          },
          "6400000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2200000,
              coverage: 8.24
            }
          },
          "6450000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2250000,
              coverage: 8.31
            }
          },
          "6500000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2300000,
              coverage: 8.38
            }
          },
          "6550000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2350000,
              coverage: 8.45
            }
          },
          "6600000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6650000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1450000,
              coverage: 14.04
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6700000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1500000,
              coverage: 14.1
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6750000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1550000,
              coverage: 14.16
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6800000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2400000,
              coverage: 8.52
            }
          },
          "6850000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2450000,
              coverage: 8.57
            }
          },
          "6900000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2500000,
              coverage: 8.62
            }
          },
          "6950000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2550000,
              coverage: 8.67
            }
          },
          "7000000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2600000,
              coverage: 8.72
            }
          },
          "7050000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2650000,
              coverage: 8.765
            }
          },
          "7100000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2700000,
              coverage: 8.81
            }
          },
          "7150000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2750000,
              coverage: 8.855
            }
          },
          "7200000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7250000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1650000,
              coverage: 14.2575
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7300000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1700000,
              coverage: 14.295
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7350000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1750000,
              coverage: 14.3325
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7400000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1800000,
              coverage: 14.37
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7450000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1850000,
              coverage: 14.4
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7500000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1900000,
              coverage: 14.43
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7550000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 1950000,
              coverage: 14.46
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7600000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2000000,
              coverage: 14.49
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7650000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2050000,
              coverage: 14.5125
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7700000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2100000,
              coverage: 14.535
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7750000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2150000,
              coverage: 14.5575
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2200000,
              coverage: 14.58
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2250000,
              coverage: 14.595
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2300000,
              coverage: 14.61
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2350000,
              coverage: 14.625
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2400000,
              coverage: 14.64
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2450000,
              coverage: 14.655
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2500000,
              coverage: 14.67
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2550000,
              coverage: 14.685
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2600000,
              coverage: 14.7
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2650000,
              coverage: 14.715
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2700000,
              coverage: 14.73
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2750000,
              coverage: 14.745
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 26.7
            },
            internet: {
              amount: 2800000,
              coverage: 14.76
            },
            magazines: {
              amount: 2800000,
              coverage: 8.9
            }
          }
        },
        adventurers: {
          "0": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 0,
              coverage: 0
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "50000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 50000,
              coverage: 0.7125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 100000,
              coverage: 1.425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 150000,
              coverage: 2.1375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 200000,
              coverage: 2.85
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 250000,
              coverage: 4.005
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 300000,
              coverage: 5.16
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 350000,
              coverage: 6.315
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 8.2275
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 8.985
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 9.7425
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 11.325
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 850000,
              coverage: 12.3825
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 900000,
              coverage: 12.615
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 950000,
              coverage: 12.8475
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 0,
              coverage: 0
            }
          },
          "1050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 450000,
              coverage: 3.0375
            }
          },
          "1100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 500000,
              coverage: 3.725
            }
          },
          "1150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 550000,
              coverage: 4.4125
            }
          },
          "1200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 400000,
              coverage: 7.47
            },
            magazines: {
              amount: 800000,
              coverage: 8.2
            }
          },
          "1250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 450000,
              coverage: 8.2275
            },
            magazines: {
              amount: 800000,
              coverage: 8.2
            }
          },
          "1300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 500000,
              coverage: 8.985
            },
            magazines: {
              amount: 800000,
              coverage: 8.2
            }
          },
          "1350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 550000,
              coverage: 9.7425
            },
            magazines: {
              amount: 800000,
              coverage: 8.2
            }
          },
          "1400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 800000,
              coverage: 8.2
            }
          },
          "1450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 850000,
              coverage: 8.9375
            }
          },
          "1500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 900000,
              coverage: 9.675
            }
          },
          "1550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 950000,
              coverage: 10.4125
            }
          },
          "1600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1000000,
              coverage: 11.15
            }
          },
          "1650000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1050000,
              coverage: 11.7875
            }
          },
          "1700000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1100000,
              coverage: 12.425
            }
          },
          "1750000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1150000,
              coverage: 13.0625
            }
          },
          "1800000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1200000,
              coverage: 13.7
            }
          },
          "1850000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1250000,
              coverage: 14.225
            }
          },
          "1900000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1300000,
              coverage: 14.75
            }
          },
          "1950000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1350000,
              coverage: 15.275
            }
          },
          "2000000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "2050000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1450000,
              coverage: 16.2125
            }
          },
          "2100000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1500000,
              coverage: 16.625
            }
          },
          "2150000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "2200000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "2250000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 700000,
              coverage: 11.325
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "2300000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "2350000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "2400000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "2450000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1650000,
              coverage: 17.775
            }
          },
          "2500000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1700000,
              coverage: 18.1
            }
          },
          "2550000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1750000,
              coverage: 18.425
            }
          },
          "2600000": {
            tv: {
              amount: 0,
              coverage: 0
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1800000,
              coverage: 18.75
            }
          },
          "2650000": {
            tv: {
              amount: 850000,
              coverage: 7.15
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1200000,
              coverage: 13.7
            }
          },
          "2700000": {
            tv: {
              amount: 900000,
              coverage: 7.74
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1200000,
              coverage: 13.7
            }
          },
          "2750000": {
            tv: {
              amount: 950000,
              coverage: 8.33
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1200000,
              coverage: 13.7
            }
          },
          "2800000": {
            tv: {
              amount: 1000000,
              coverage: 8.92
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1200000,
              coverage: 13.7
            }
          },
          "2850000": {
            tv: {
              amount: 1000000,
              coverage: 8.92
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1250000,
              coverage: 14.225
            }
          },
          "2900000": {
            tv: {
              amount: 1000000,
              coverage: 8.92
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1300000,
              coverage: 14.75
            }
          },
          "2950000": {
            tv: {
              amount: 1000000,
              coverage: 8.92
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1350000,
              coverage: 15.275
            }
          },
          "3000000": {
            tv: {
              amount: 1000000,
              coverage: 8.92
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3050000": {
            tv: {
              amount: 1050000,
              coverage: 9.43
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3100000": {
            tv: {
              amount: 1100000,
              coverage: 9.94
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3150000": {
            tv: {
              amount: 1150000,
              coverage: 10.45
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3200000": {
            tv: {
              amount: 1200000,
              coverage: 10.96
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3250000": {
            tv: {
              amount: 1250000,
              coverage: 11.38
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3300000": {
            tv: {
              amount: 1300000,
              coverage: 11.8
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3350000": {
            tv: {
              amount: 1350000,
              coverage: 12.22
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3400000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3450000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 1400000,
              coverage: 15.8
            }
          },
          "3500000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1500000,
              coverage: 16.625
            }
          },
          "3550000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "3600000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 600000,
              coverage: 10.5
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3650000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 650000,
              coverage: 10.9125
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3700000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 1550000,
              coverage: 17.0375
            }
          },
          "3750000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 750000,
              coverage: 11.7375
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3800000": {
            tv: {
              amount: 1400000,
              coverage: 12.64
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3850000": {
            tv: {
              amount: 1450000,
              coverage: 12.97
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3900000": {
            tv: {
              amount: 1500000,
              coverage: 13.3
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "3950000": {
            tv: {
              amount: 1550000,
              coverage: 13.63
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "4000000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1600000,
              coverage: 17.45
            }
          },
          "4050000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1650000,
              coverage: 17.775
            }
          },
          "4100000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1700000,
              coverage: 18.1
            }
          },
          "4150000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1750000,
              coverage: 18.425
            }
          },
          "4200000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1800000,
              coverage: 18.75
            }
          },
          "4250000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1850000,
              coverage: 19.0125
            }
          },
          "4300000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1900000,
              coverage: 19.275
            }
          },
          "4350000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 1950000,
              coverage: 19.5375
            }
          },
          "4400000": {
            tv: {
              amount: 1600000,
              coverage: 13.96
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4450000": {
            tv: {
              amount: 1650000,
              coverage: 14.22
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4500000": {
            tv: {
              amount: 1700000,
              coverage: 14.48
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4550000": {
            tv: {
              amount: 1750000,
              coverage: 14.74
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4600000": {
            tv: {
              amount: 1800000,
              coverage: 15
            },
            internet: {
              amount: 800000,
              coverage: 12.15
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4650000": {
            tv: {
              amount: 1800000,
              coverage: 15
            },
            internet: {
              amount: 850000,
              coverage: 12.3825
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4700000": {
            tv: {
              amount: 1800000,
              coverage: 15
            },
            internet: {
              amount: 900000,
              coverage: 12.615
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4750000": {
            tv: {
              amount: 1800000,
              coverage: 15
            },
            internet: {
              amount: 950000,
              coverage: 12.8475
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4800000": {
            tv: {
              amount: 1800000,
              coverage: 15
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4850000": {
            tv: {
              amount: 1850000,
              coverage: 15.21
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4900000": {
            tv: {
              amount: 1900000,
              coverage: 15.42
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "4950000": {
            tv: {
              amount: 1950000,
              coverage: 15.63
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "5000000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2000000,
              coverage: 19.8
            }
          },
          "5050000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2050000,
              coverage: 20
            }
          },
          "5100000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2100000,
              coverage: 20.2
            }
          },
          "5150000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2150000,
              coverage: 20.4
            }
          },
          "5200000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2200000,
              coverage: 20.6
            }
          },
          "5250000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2250000,
              coverage: 20.775
            }
          },
          "5300000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2300000,
              coverage: 20.95
            }
          },
          "5350000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2350000,
              coverage: 21.125
            }
          },
          "5400000": {
            tv: {
              amount: 2000000,
              coverage: 15.84
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5450000": {
            tv: {
              amount: 2050000,
              coverage: 16
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5500000": {
            tv: {
              amount: 2100000,
              coverage: 16.16
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5550000": {
            tv: {
              amount: 2150000,
              coverage: 16.32
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5600000": {
            tv: {
              amount: 2200000,
              coverage: 16.48
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5650000": {
            tv: {
              amount: 2250000,
              coverage: 16.62
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5700000": {
            tv: {
              amount: 2300000,
              coverage: 16.76
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5750000": {
            tv: {
              amount: 2350000,
              coverage: 16.9
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5800000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1000000,
              coverage: 13.08
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5850000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1050000,
              coverage: 13.215
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5900000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1100000,
              coverage: 13.35
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "5950000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1150000,
              coverage: 13.485
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "6000000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2400000,
              coverage: 21.3
            }
          },
          "6050000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2450000,
              coverage: 21.425
            }
          },
          "6100000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2500000,
              coverage: 21.55
            }
          },
          "6150000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2550000,
              coverage: 21.675
            }
          },
          "6200000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2600000,
              coverage: 21.8
            }
          },
          "6250000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2650000,
              coverage: 21.9125
            }
          },
          "6300000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2700000,
              coverage: 22.025
            }
          },
          "6350000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2750000,
              coverage: 22.1375
            }
          },
          "6400000": {
            tv: {
              amount: 2400000,
              coverage: 17.04
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6450000": {
            tv: {
              amount: 2450000,
              coverage: 17.14
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6500000": {
            tv: {
              amount: 2500000,
              coverage: 17.24
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6550000": {
            tv: {
              amount: 2550000,
              coverage: 17.34
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6600000": {
            tv: {
              amount: 2600000,
              coverage: 17.44
            },
            internet: {
              amount: 1200000,
              coverage: 13.62
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6650000": {
            tv: {
              amount: 2600000,
              coverage: 17.44
            },
            internet: {
              amount: 1250000,
              coverage: 13.71
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6700000": {
            tv: {
              amount: 2600000,
              coverage: 17.44
            },
            internet: {
              amount: 1300000,
              coverage: 13.8
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6750000": {
            tv: {
              amount: 2600000,
              coverage: 17.44
            },
            internet: {
              amount: 1350000,
              coverage: 13.89
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6800000": {
            tv: {
              amount: 2600000,
              coverage: 17.44
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6850000": {
            tv: {
              amount: 2650000,
              coverage: 17.53
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6900000": {
            tv: {
              amount: 2700000,
              coverage: 17.62
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "6950000": {
            tv: {
              amount: 2750000,
              coverage: 17.71
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7000000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1400000,
              coverage: 13.98
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7050000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1450000,
              coverage: 14.04
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7100000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1500000,
              coverage: 14.1
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7150000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1550000,
              coverage: 14.16
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7200000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1600000,
              coverage: 14.22
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7250000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1650000,
              coverage: 14.2575
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7300000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1700000,
              coverage: 14.295
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7350000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1750000,
              coverage: 14.3325
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7400000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1800000,
              coverage: 14.37
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7450000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1850000,
              coverage: 14.4
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7500000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1900000,
              coverage: 14.43
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7550000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 1950000,
              coverage: 14.46
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7600000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2000000,
              coverage: 14.49
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7650000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2050000,
              coverage: 14.5125
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7700000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2100000,
              coverage: 14.535
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7750000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2150000,
              coverage: 14.5575
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7800000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2200000,
              coverage: 14.58
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7850000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2250000,
              coverage: 14.595
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7900000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2300000,
              coverage: 14.61
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "7950000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2350000,
              coverage: 14.625
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8000000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2400000,
              coverage: 14.64
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8050000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2450000,
              coverage: 14.655
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8100000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2500000,
              coverage: 14.67
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8150000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2550000,
              coverage: 14.685
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8200000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2600000,
              coverage: 14.7
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8250000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2650000,
              coverage: 14.715
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8300000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2700000,
              coverage: 14.73
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8350000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2750000,
              coverage: 14.745
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          },
          "8400000": {
            tv: {
              amount: 2800000,
              coverage: 17.8
            },
            internet: {
              amount: 2800000,
              coverage: 14.76
            },
            magazines: {
              amount: 2800000,
              coverage: 22.25
            }
          }
        }
      }
    };
  },
  computed: {
    tvCoverage: function() {
      return this.getChannelCoverage("tv");
    },
    internetCoverage: function() {
      return this.getChannelCoverage("internet");
    },
    magazinesCoverage: function() {
      return this.getChannelCoverage("magazines");
    },
    overallCoverage: function() {
      return +(
        this.tvCoverage +
        this.internetCoverage +
        this.magazinesCoverage
      ).toFixed(4);
    },
    costPerPercent: function() {
      return Math.round(this.budget / this.overallCoverage || 0);
    },
    production: function() {
      return this.percentageCalc(this.demand, this.marketShare);
    },
    realCapacity: function() {
      return this.percentageCalc(this.totalCapacity, this.efficiency);
    },
    styleCost: function() {
      return +(this.styleNew * 0.12).toFixed(4);
    },
    specsCost: function() {
      return +(this.specsNew * 4.75).toFixed(4);
    },
    primeCost: function() {
      return Math.ceil(+(this.styleCost + this.specsCost).toFixed(4));
    },
    styleChangeCost: function() {
      return +Math.abs(this.styleExst - this.styleNew).toFixed(4) * 1000;
    },
    specsChangeCost: function() {
      return +Math.abs(this.specsExst - this.specsNew).toFixed(4) * 20000;
    },
    changeCost: function() {
      return Math.ceil(
        +(this.styleChangeCost + this.specsChangeCost).toFixed(4)
      );
    }
  },
  methods: {
    copyToClipboard(value) {
      const textAreaElement = document.createElement("textarea");
      textAreaElement.value = value;
      document.body.appendChild(textAreaElement);
      textAreaElement.select();
      document.execCommand("copy");
      document.body.removeChild(textAreaElement);
    },
    percentageCalc: function(number, percentage) {
      return Math.round(number * (percentage / 100));
    },
    getChannelAmount(channel) {
      return this.data[this.segment][this.budget || 0][channel]["amount"];
    },
    getChannelCoverage(channel) {
      return +this.data[this.segment][this.budget || 0][channel][
        "coverage"
      ].toFixed(4);
    }
  },
  filters: {
    capitalize: value => {
      return value
        ? value
            .toString()
            .charAt(0)
            .toUpperCase() + value.slice(1)
        : "";
    },
    labelize: value => {
      return value ? value + ":" : "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.form-control[disabled] {
  background-color: white;
}
</style>
