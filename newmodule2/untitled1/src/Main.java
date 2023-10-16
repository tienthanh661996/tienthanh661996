
       import java.util.Scanner;

        public class Main {
            public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in);

                System.out.println("Nhập chiều dài: ");
                int dai = scanner.nextInt();

                System.out.println("Nhập chiều rộng: ");
                int rong = scanner.nextInt();

                System.out.println("Chu vi: " + (dai + rong) * 2);
                System.out.println("Diện tích: " + dai * rong);
            }
        }