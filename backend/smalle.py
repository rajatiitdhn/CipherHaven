from decimal import *




def smalle(c):
    i=100
    
    while i < 2000:
        # set precision
        getcontext().prec = i

        # calculate cube root with values wrapped in decimal
        # it is then rounded off using Decimal.to_integral_exact()
        cube_root = int((Decimal(c) ** (Decimal(1) / Decimal(3))).to_integral_exact())

        # remove 0x from start of string
        hex_str = hex(cube_root)[2:]
        try:
            dehex = bytes.fromhex(hex_str).decode()
            flag = bytes.fromhex(dehex).decode()
            if flag.isalnum():
                return flag
                break
        except UnicodeDecodeError:
            pass
        except ValueError:
            pass
        i += 1
        
