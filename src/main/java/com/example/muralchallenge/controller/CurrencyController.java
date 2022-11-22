package com.example.muralchallenge.controller;

import com.example.muralchallenge.entity.Currency;
import com.google.gson.Gson;
import lombok.SneakyThrows;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CurrencyController {
    static List<Currency> currencies = new ArrayList<>();
    static final String url = "https://api.exchangerate.host/latest";

    @RequestMapping("list")
    public List<String> currencyConverterMapping() {
        List<String> ccy = new ArrayList<>();
        getCurrencies();
        for (Currency currency : currencies) {
            ccy.add(currency.getCcy());
        }
        return ccy;
    }

    @SneakyThrows
    private static void getCurrencies() {
        InputStream is = new URL(url).openStream();
        BufferedReader rd = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
        String jsonText = readAll(rd);
        HashMap<String, Double> mapOfCurrencies = new Gson().fromJson(String.valueOf(new JSONObject(jsonText).get("rates")), HashMap.class);

        for (HashMap.Entry<String, Double> currency : mapOfCurrencies.entrySet()) {
            currencies.add(new Currency(currency.getKey(), currency.getValue()));
        }
    }

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    @RequestMapping("convert/{amount}/{ccyFrom}/{ccyTo}")
    public static Double getSum(@PathVariable int amount, @PathVariable String ccyFrom, @PathVariable String ccyTo) {
        System.out.println("amount = " + amount + " ccyFrom = " + ccyFrom + " ccyTo = " + ccyTo);
        Double sum = sum(amount, ccyFrom, ccyTo);
        System.out.println("sum = " + sum);
        return sum;
    }

    private static Double sum(int amount, String ccyFrom, String ccyTo) {
        double sum = 0;
        for (Currency currencyFrom : currencies) {
            if (currencyFrom.getCcy().equals(ccyFrom)) {
                for (Currency currencyTo : currencies) {
                    if (currencyTo.getCcy().equals(ccyTo)) {
                        sum = (amount / currencyFrom.getPrice() * currencyTo.getPrice());
                        break;
                    }
                }
                break;
            }
        }
        return sum;
    }
}