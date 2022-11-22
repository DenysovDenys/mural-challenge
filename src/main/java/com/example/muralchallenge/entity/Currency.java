package com.example.muralchallenge.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Currency {

    private String ccy;
    private Double price;

    @Override
    public String toString() {
        return "Currency{" +
                "ccy='" + ccy + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}