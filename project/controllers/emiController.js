const { Loan } = require("../models");

// EMI formula calculation
const calculateEMI = (P, R, N) => {
  R = R / (12 * 100); // Monthly interest rate
  const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  return EMI;
};

// Month-wise breakdown with prepayment handling
const calculatePaymentBreakdown = (P, EMI, R, N, prepayment = 0) => {
  R = R / (12 * 100);
  let balance = P;
  const payments = [];

  for (let month = 1; month <= N; month++) {
    let interest = balance * R;
    let principal = EMI - interest;

    if (prepayment && month === 1) {
      principal += prepayment;
    }

    balance -= principal;

    payments.push({
      month,
      emiPaid: EMI,
      interestPaid: interest,
      principalPaid: principal,
      prepayment: month === 1 ? prepayment : 0,
      remainingBalance: balance > 0 ? balance : 0,
    });

    if (balance <= 0) break; // Loan is fully paid off
  }

  return payments;
};

// POST /api/calculate-emi
exports.calculateEMI = async (req, res) => {
  const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount } =
    req.body;

  const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);
  const payments = calculatePaymentBreakdown(
    loan_amount,
    emi,
    interest_rate,
    loan_tenure_months,
    prepayment_amount
  );

  const remaining_balance = payments[payments.length - 1].remainingBalance;

  try {
    const loan = await Loan.create({
      loan_amount,
      interest_rate,
      loan_tenure_months,
      emi,
      prepayment_amount,
      remaining_balance,
    });

    res.json({
      loanAmount: loan.loan_amount,
      interestRate: loan.interest_rate,
      loanTenureMonths: loan.loan_tenure_months,
      emi: loan.emi,
      prepayment: loan.prepayment_amount,
      monthWisePayments: payments,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate EMI" });
  }
};

exports.getAllEMIs = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch EMI records" });
  }
};

exports.getEMIById = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ error: "EMI record not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch EMI record" });
  }
};
