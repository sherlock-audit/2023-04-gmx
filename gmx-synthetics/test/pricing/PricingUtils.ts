import { expect } from "chai";
import { deployContract } from "../../utils/deploy";

describe("PricingUtils", () => {
  it("should apply impact factor", async () => {
    const pricingUtilsTest = await deployContract("PricingUtilsTest", []);

    for (const [diffUsd, exponentFactor, impactFactor, expected] of [
      // make sure it works for really big values
      [10000, 3, "0.000000000002", "999999999999999971996569854874"],
      [100000, 3, "0.000000000002", "999999999999999972158527355760923"],
      [1000000, 3, "0.000000000002", "999999999999999974481076694795741150"],
      [10000000, 3, "0.000000000002", "999999999999999977004203243086721668335"],
      [1000000000, 3, "0.000000000002", "999999999999999964992485098699963454527292263"],
      [1000000000, 3, "2", "999999999999999964992485098699963454527292263000000000000"],

      [10000, 2, "0.00000002", "999999999999999981235216490000"],
      [100000, 2, "0.00000002", "99999999999999998147004678330000"],
      [1000000, 2, "0.00000002", "9999999999999999830554320142260000"],
      [10000000, 2, "0.00000002", "999999999999999984577907497082540000"],

      [10000, "1.75", "0.0000002", "999999999999999983993282600000"],
      [100000, "1.75", "0.0000002", "56234132519034907150467965500000"],
      [1000000, "1.75", "0.0000002", "3162277660168379284617577705300000"],
      [10000000, "1.75", "0.0000002", "177827941003892277732818564790100000"],

      // and for small values
      ["0.0000000000001", "1.5", "0.000002", 0],
      ["0.001", "1.5", "0.000002", 0],
      [1, "1.5", "0.000002", "1000000000000000000000000"],
      [1000, "1.5", "0.000002", "31622776601683792872691000000"],
      [10000, "1.5", "0.000002", "999999999999999985875227000000"],
      [100000, "1.5", "0.000002", "31622776601683792881032921000000"],
      [1000000, "1.5", "0.000002", "999999999999999987642846054000000"],
      [10000000, "1.5", "0.000002", "31622776601683792957603597100000000"],

      [10000, "1", "0.0002", "1000000000000000000000000000000"],
      [100000, "1", "0.0002", "10000000000000000000000000000000"],
      [1000000, "1", "0.0002", "100000000000000000000000000000000"],
      [10000000, "1", "0.0002", "1000000000000000000000000000000000"],
    ]) {
      const result = await pricingUtilsTest.applyImpactFactor(
        ethers.utils.parseUnits(String(diffUsd), 30),
        ethers.utils.parseUnits(String(impactFactor), 30),
        ethers.utils.parseUnits(String(exponentFactor), 30)
      );
      expect(result).to.equal(expected);
    }
  });
});