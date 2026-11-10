ALTER TABLE `caregiver_schedule_entries`
ADD COLUMN `payroll_amount_cents_override` integer
CONSTRAINT `caregiver_schedule_entries_payroll_amount_cents_override_check`
CHECK (`payroll_amount_cents_override` IS NULL OR `payroll_amount_cents_override` BETWEEN 1 AND 100000000);
